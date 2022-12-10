import os
from fastapi import FastAPI
from app.album_cover import album_cover_basic_model
from app.lyric_generation import lyric_generation_basic_model
import uvicorn

REPLICATE_API_TOKEN = os.environ.get("REPLICATE_API_TOKEN")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

app = FastAPI()

@app.get("/")
def home():
    return{"message": "AssemblyAI hackathon submission"}

@app.get("/lyric_generation")
def lyric_generation(text_prompt: str, artist: str):
    print(text_prompt)
    print(OPENAI_API_KEY)
    response = lyric_generation_basic_model(text_prompt)
    return response

@app.post("/album_cover")
def album_cover_input(text_prompt: str):
    print(text_prompt)
    print(REPLICATE_API_TOKEN)
    response = album_cover_basic_model(text_prompt)
    return response

if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, reload=True)