import os
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from app.album_cover import generate_album_cover_art
from app.lyric_generation import generate_song_lyrics
from app.bg_music import generate_music
import yaml
import uvicorn
from pydantic import BaseModel
from typing import Optional
import boto3

class album_input(BaseModel):
    text_prompt: str

class lyric_input(BaseModel):
    text_prompt: str
    genre: Optional[str] = " "

class bgm_input(BaseModel):
    url: Optional[str] = None
    mp3_file: Optional[UploadFile] = None

## Load API KEY TOKENS
REPLICATE_API_TOKEN = os.environ.get("REPLICATE_API_TOKEN")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

## Load configuration for app
with open('config.yaml', 'r') as file:
    config = yaml.safe_load(file)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],
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

@app.post("/api/v1/lyric_generation")
def lyric_generation(data: lyric_input):
    """
    Route for generating song lyrics based on user prompt
    Args:
        text_prompt (str): Input text prompt by user which will be fed to model for lyrics generation
        genre (str): User input for genre of music which will help in generating better output using the model
    Returns:
        response (str): Model response containing song lyrics as output
    """
    prompts = {"genre": data.genre, "text": data.text_prompt}
    lyrics_gen_config = config["lyric_generation"]
    response = generate_song_lyrics(prompts, lyrics_gen_config)
    return JSONResponse(response, status_code=201)

@app.post("/api/v1/album_cover")
def album_cover_input(data: album_input):
    """
    Route for generating album/song cover art based on user prompt
    Args:
        text_prompt (str): Input text prompt by user which will be fed to model for generating album/song art
    Returns:
        response (str): Model response containing generated image link
    """
    album_art_config = config["album_cover_art"]
    response = generate_album_cover_art(album_art_config, data.text_prompt)
    return JSONResponse(response, status_code=201)

@app.post("/api/v1/bg_music")
def bg_music(data: bgm_input):
    #url: str = None, mp3_file: UploadFile = File(...)):
    """
    Route for generating album/song cover art based on user prompt
    Args:
        text_prompt (str): Input text prompt by user which will be fed to model for generating album/song art
    Returns:
        response (str): Model response containing generated image link
    """
    # if data.text_prompt is not None:
    #     #download file
    #     try:
    #         mp3_file = "mp3"
    #     except:
    #         mp3_file = None
    bg_music_config = config["bg_music"]
    midi_file_name = download_file_from_s3(bg_music_config["s3_bucket_name"], data.url)
    response = generate_music(bg_music_config, midi_file_name)
    return JSONResponse(response, status_code=201)

@app.post("/api/v1/bg_music_file_input")
def bg_music(file: UploadFile = File(...)):
    #url: str = None, mp3_file: UploadFile = File(...)):
    """
    Route for generating album/song cover art based on user prompt
    Args:
        text_prompt (str): Input text prompt by user which will be fed to model for generating album/song art
    Returns:
        response (str): Model response containing generated image link
    """
    # if data.text_prompt is not None:
    #     #download file
    #     try:
    #         mp3_file = "mp3"
    #     except:
    #         mp3_file = None
    print("recieved")
    bg_music_config = config["bg_music"]
#     midi_file_name = download_file_from_s3(bg_music_config["s3_bucket_name"], data.url)
    response = generate_music(bg_music_config, "/home/ubuntu/AssemblyAI/assembly-ai-hackathon/backend/app/input_audio/test.mid")
    return JSONResponse(response, status_code=201)


def download_file_from_s3(s3_bucket_name, midi_file_name):
    s3 = boto3.client("s3")
    midi_file_name = "input_audio/"+midi_file_name
    s3.download_file(
        Bucket=s3_bucket_name, 
        Filename=midi_file_name
    )
    return midi_file_name
    
     

if __name__ == "__main__":
    uvicorn.run("main:app", port=8001, reload=True)