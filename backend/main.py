import os
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from app.album_cover import generate_album_cover_art
from app.lyric_generation import generate_song_lyrics
from app.bg_music import generate_background_music
import yaml
import uvicorn

## Load API KEY TOKENS
REPLICATE_API_TOKEN = os.environ.get("REPLICATE_API_TOKEN")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

## Load configuration for app
with open('config.yaml', 'r') as file:
    config = yaml.safe_load(file)

app = FastAPI()


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

@app.post("/lyric_generation")
def lyric_generation(text_prompt: str, genre: str = " "):
    """
    Route for generating song lyrics based on user prompt
    Args:
        text_prompt (str): Input text prompt by user which will be fed to model for lyrics generation
        genre (str): User input for genre of music which will help in generating better output using the model
    Returns:
        response (str): Model response containing song lyrics as output
    """
    print(text_prompt)
    print(OPENAI_API_KEY)
    prompts = {"genre": genre, "text": text_prompt}
    lyrics_gen_config = config["lyric_generation"]
    response = generate_song_lyrics(prompts, lyrics_gen_config)
    return JSONResponse(response, status_code=201)

@app.post("/album_cover")
def album_cover_input(text_prompt: str):
    """
    Route for generating album/song cover art based on user prompt
    Args:
        text_prompt (str): Input text prompt by user which will be fed to model for generating album/song art
    Returns:
        response (str): Model response containing generated image link
    """
    print(text_prompt)
    print(REPLICATE_API_TOKEN)
    album_art_config = config["album_cover_art"]
    response = generate_album_cover_art(album_art_config, text_prompt)
    return JSONResponse(response, status_code=201)

@app.post("/bg_music")
def bg_music(url: str = None, mp3_file: str = None):
    """
    Route for generating album/song cover art based on user prompt
    Args:
        text_prompt (str): Input text prompt by user which will be fed to model for generating album/song art
    Returns:
        response (str): Model response containing generated image link
    """
    if url is not None:
        #download file
        mp3_file = "mp3"
    if mp3_file is not None:
        # check extension
        # convert mp3_file to mid
        mid_file = "mid file"
    print(REPLICATE_API_TOKEN)
    album_art_config = config["album_cover_art"]
    response = generate_background_music(album_art_config, text_prompt)
    return JSONResponse(response, status_code=201)




if __name__ == "__main__":
    uvicorn.run("main:app", port=8001, reload=True)