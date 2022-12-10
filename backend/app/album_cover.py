import replicate
import os
REPLICATE_API_TOKEN = os.getenv("REPLICATE_API_TOKEN")

def album_cover_basic_model(prompt = "a 19th century portrait of a wombat gentleman"):
    print(REPLICATE_API_TOKEN)
    model = replicate.models.get("prompthero/openjourney")
    version = model.versions.get("9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb")
    print(prompt, "prompt")
    response = version.predict(prompt = prompt)
    return response