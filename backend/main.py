import os
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from app.generate_cover_art import generate_cover_art_replicate, generate_cover_art_HF
from app.generate_lyrics import generate_song_lyrics
from app.generate_music import generate_music
import yaml
import uvicorn
from app.models import cover_art_input, lyrics_input
from app.utils import download_file_from_s3
from typing import Optional
import traceback

## Load API KEY TOKENS
REPLICATE_API_TOKEN = os.environ.get("REPLICATE_API_TOKEN")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

## Load configuration for app
with open('config.yaml', 'r') as file:
    config = yaml.safe_load(file)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

## Define App routes
@app.get("/")
def home():
    """
    Home Router for our Music App
    
    Returns:
        startup_msg (dict): Message to be displayed for app home route
    """
    startup_msg: dict = {"message": "AssemblyAI hackathon submission"}
    return startup_msg

@app.post("/api/v1/lyrics/generate") #lyric_generation
def generate_lyrics(lyrics_input: lyrics_input):
    """
    Route for generating song lyrics based on user prompt
    
    Args:
        text_prompt (str): Input text prompt by user which will be fed to model for lyrics generation.
        genre (str): User input for genre of music which will help in generating better output using the model.
    
    Returns:
        response (str): Model response containing song lyrics as output
    """
    lyrics_gen_config = config["lyric_generation"]
    try:
        generated_lyrics = generate_song_lyrics(lyrics_input, lyrics_gen_config)
        response = {"output_lyrics": generated_lyrics}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

    return JSONResponse(response, status_code=201)

@app.post("/api/v1/cover_art/generate") #album_cover
def generate_cover_art(cover_art_inputs: cover_art_input):
    """
    Route for generating album/song cover art based on user prompt
    
    Args:
        text_prompt (str): Input text prompt by user which will be fed to model for generating album/song art
    
    Returns:
        response (str): Model response containing generated image link
    """
    album_art_config = config["cover_art"]
    try:
        if cover_art_inputs.model_choice == "replicate":
            ## load model from Replicate
            generated_img_links = generate_cover_art_replicate(album_art_config, cover_art_inputs)
            response = {"generated_cover_art": generated_img_links} #output_album

        else:
            ## else load custom/default model from HF Hub
            img_urls_list,base64_list = generate_cover_art_HF(album_art_config, cover_art_inputs)
            response = {"generated_cover_art": img_urls_list, "encoded_imgs": base64_list} #output_album

        response = JSONResponse(response, status_code=201)
        response.headers['Access-Control-Allow-Origin']= "*"

    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

    return response

@app.post("/api/v1/music/upload/generate") #bg_music_file_input
def upload_audio_generate_music(audiofile: UploadFile = File(...), prime_measure_count: int = 5):
    """
    Route for generating music note sequence based on user input audio sequence
    
    Args:
        example_file_name (str): Input text prompt by user which will be fed to model for generating album/song art
    
    Returns:
        response (str): 
    """
    bg_music_config = config["bg_music"]
    print("prime_measure_count:", prime_measure_count)
    bg_music_config['prime_measure_count'] = prime_measure_count

    midi_file_contents = audiofile.file.read()
    print("contents type:", type(midi_file_contents))

    try:
        mp3_output_path = generate_music(bg_music_config, midi_file_contents)
        response = {"output_bg_music": mp3_output_path}

    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

    return JSONResponse(response, status_code=201)


@app.post("/api/v1/music/example/generate") #bg_music_file_input
def use_example_generate_music(audiofile: str = "bach.mid", prime_measure_count: Optional[int] = 5):
    """
    Route for generating music note sequence based on user input audio sequence
    
    Args:
        example_file_name (str): Example audio file path 
    
    Returns:
        response (str): 
    """
    bg_music_config = config["bg_music"]
    print("prime_measure_count:", prime_measure_count)
    bg_music_config['prime_measure_count'] = prime_measure_count

    midi_file_path = "examples/"+ audiofile

    try:
        if not os.path.exists(midi_file_path):
            midi_file_path = download_file_from_s3(bg_music_config["s3_bucket_name"], midi_file_path)
        
        mp3_output_path = generate_music(bg_music_config, midi_file_path=midi_file_path)
        response = {"output_bg_music": mp3_output_path}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

    return JSONResponse(response, status_code=201)
    
     

if __name__ == "__main__":
    uvicorn.run("main:app", port=8001, reload=True)