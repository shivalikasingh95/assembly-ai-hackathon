import os
import openai

openai.api_key = os.environ.get("OPENAI_API_KEY")


def lyric_generation_basic_model(inputs: dict):
  prompt_text = f"Below is a {inputs['genre']} song by {inputs['artist']} about {inputs['text']}.\n\n '{inputs['text']}'\n"
  print(prompt_text)
  response = openai.Completion.create(
    engine="davinci",
    prompt=prompt_text,
    temperature=0.7,
    max_tokens=256,
    frequency_penalty=0.3
  )
  print(response)
  return response
