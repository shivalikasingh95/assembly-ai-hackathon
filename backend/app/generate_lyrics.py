import os
import openai
import random


def generate_song_lyrics(inputs, config: dict):
  """
  This function uses one of OpenAI GPT3 model variants to generate lyrics for a song corresponding to user prompt.
  Args:
    inputs (lyrics_input): user inputs for song lyrics generation such as song genre, prompt text and model params to control model output
    config (dict): Configuration to be used by the model for generation of song lyrics
  Returns:
    response (str): Song lyrics generated by the model
  """
  ## choose artist
  engine = config["engine"]
  genre_config = config[inputs.genre]
  artists = genre_config["artists"]
  artist = random.choice(artists)
  
  ## read genre specific values from config file if not specified by user 
  if inputs.frequency_penalty is None:
    freq_penalty = genre_config["frequency_penalty"]
  else:
    freq_penalty = inputs.frequency_penalty

  if inputs.max_tokens is None:
    max_tokens = genre_config["max_tokens"]
  else:
    max_tokens = inputs.max_tokens

  if inputs.temperature is None:
    temperature = genre_config["temperature"]
  else:
    temperature = inputs.temperature
  
  # prepare prompt text
  prompt_text = f"Prompt:{inputs['text']}\n\nArtist:{artist}\n\nLyrics:\n"
  print(prompt_text)
  
  ## get model prediction
  response = openai.Completion.create(
    engine=engine,
    prompt=prompt_text,
    temperature=temperature,
    max_tokens=max_tokens,
    frequency_penalty=freq_penalty
  )
  print(response)
  return response["choices"][0]["text"]