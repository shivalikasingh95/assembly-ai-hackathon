from pydantic import BaseModel
from typing import Optional
from fastapi import UploadFile, File

class cover_art_input(BaseModel):
    
    # values - "replicate" , "custom", "default"
    model_choice: str = "default"

    # prompt for model for cover art generation
    text_prompt: str

    # Width of output image. Allowed values:128, 256, 512, 768, 1024
    image_width: Optional[int] = 512

    # Height of output image. Allowed values:128, 256, 512, 768, 1024
    image_height: Optional[int] = 512

    # Number of denoising steps. Min value = 50. Max value = 500
    num_inference_steps: Optional[int] = 50

    # Scale for classifier-free guidance. Minimum value = 1, Max value = 20.
    guidance_scale: Optional[float] = 7

    # Number of images to output
    num_outputs: Optional[int] = 1


class lyrics_input(BaseModel):

    # prompt for lyrics generation
    text_prompt: str

    # genre of music
    genre: Optional[str] = "generic"

    ## temperature for GPT3 model - helps in deciding how the model chooses from its next choice of tokens.
    ## Low temp -> produces more predictable output. High temp -> produces more creative output
    temperature: Optional[float] = None

    ## max_tokens to output for lyrics generation model (GPT3)
    max_tokens: Optional[int] = None

    ## frequency_penalty for lyrics generation model (GPT3)
    frequency_penalty: Optional[float] = None


class music_gen_input(BaseModel):

    ## set how many measures of chords from the MIDI file you may want to keep - 
    ## output will be conditioned on first `prime_measure_count` of MIDI file
    prime_measure_count: Optional[int] = 5

    ## if you want to put constraints of chord progression
    # prime_chord_count: int = 0