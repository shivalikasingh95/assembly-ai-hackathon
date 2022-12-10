import os
from fastapi import FastAPI
from app.album_cover import generate_album_cover_art
from app.lyric_generation import generate_song_lyrics
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
    return response

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
    response = generate_album_cover_art(text_prompt, album_art_config)
    return response

if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, reload=True)