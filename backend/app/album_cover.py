import replicate
import os
REPLICATE_API_TOKEN = os.getenv("REPLICATE_API_TOKEN")

def album_cover_basic_model(prompt = "a 19th century portrait of a wombat gentleman"):
    print(REPLICATE_API_TOKEN)
    model = replicate.models.get("stability-ai/stable-diffusion")
    version = model.versions.get("27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478")
    print(prompt, "prompt")
    response = version.predict(prompt)
    return response