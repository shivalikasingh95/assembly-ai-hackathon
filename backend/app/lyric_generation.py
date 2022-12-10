import os
import openai

openai.api_key = os.environ.get("OPENAI_API_KEY")

def lyric_generation_basic_model(inputs):
  prompt_text = f"Artist: {inputs['artist']}\n\nLyrics:\n"

  response = openai.Completion.create(
    engine="davinci",
    prompt=prompt_text,
    temperature=0.7,
    max_tokens=256,
    frequency_penalty=0.5
  )
  print(prompt_text + response['choices'][0]['text'])
  return response

