from album_cover import album_cover_basic_model
import eyed3
from eyed3.id3.frames import ImageFrame

prompt = "Dramatic, Dark, Super-Resolution, Evil, Neon Lamp, Cinematic Lighting, Chromatic Aberration, insanely detailed and intricate, hypermaximalist, elegant, ornate, hyper realistic, super detailed, Unreal Engine"

def bg_music_basic_model():
    # insert replicate model here
    mp3 = "mp3"
    if add_album_cover_flag:
        mp3 = add_album_cover(mp3)
    return mp3




def add_album_cover(mp3):
    # use gpt3 for prompt gen maybe
    album_cover = album_cover_basic_model(prompt)
    audiofile = eyed3.load(mp3)
    if (audiofile.tag == None):
        audiofile.initTag()
    audiofile.tag.images.set(ImageFrame.FRONT_COVER, open(album_cover, 'rb').read(), 'image/jpeg')
    audiofile.tag.save()
    return audiofile