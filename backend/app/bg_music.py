from .album_cover import generate_album_cover_art
import eyed3
from eyed3.id3.frames import ImageFrame

prompt = "Dramatic, Dark, Super-Resolution, Evil, Neon Lamp, Cinematic Lighting, Chromatic Aberration, insanely detailed and intricate, hypermaximalist, elegant, ornate, hyper realistic, super detailed, Unreal Engine"

def generate_background_music(mid_file):
    # insert replicate model here
    mp3 = "mp3"
    mp3 = add_album_cover(prompt)
    return {"output_bg_music": mp3}


def add_album_cover(mp3):
    # use gpt3 for prompt gen maybe
    album_cover = generate_album_cover_art(prompt)
    audiofile = eyed3.load(mp3)
    if (audiofile.tag == None):
        audiofile.initTag()
    audiofile.tag.images.set(ImageFrame.FRONT_COVER, open(album_cover, 'rb').read(), 'image/jpeg')
    audiofile.tag.save()
    return audiofile