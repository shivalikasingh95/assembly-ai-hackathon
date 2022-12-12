# Project Submission for AssemblyAI Hackathon 

## Chords & Art - Your AI buddy for your Music needs

We're all aware of the tremendous progress made in the generative AI space recently. With our project, `Chords & Art` we have tried to leverage the recent advancements made in this area and applied to the domain of Music.
We thought it'll be extremely useful as well cool to have a project that could help address different needs that someone may have with respect to generation of music -- whether you want to write lyrics for a song, compose music or even generate cover art for your music piece -- we can help you with all of these :)
We think it's the kind of companion any music artist would want whose muse is being uncooperative.

### How we built it
It was a team effort with each of us looking into various models that interested us and pitching in to make the app pitch perfect.


### Challenges we ran into
Fine tuning stable diffusion
Conversion of midi to mp3 files
Figuring out right settings for good lyric generation for GPT3

### Accomplishments that we're proud of
Our fine tuned model for album covers
We were able to finish all the 3 modules we planned


### What we learned
That there are amazing uses for AI and that there are so many options to leverage AI models both for creativity and for solving critical problems.

### What's next for Chords & Art
We wish to combine the lyrics, album art, and music to create songs as a whole.

### Built With
    - UI: CSS, HTML, React, Javascript
    - Backend: Fastapi
    - ML: OpenAI GPT3, Replicate, Stable Diffusion, SymphonyNet


## Project Setup

### Prequisites:

1. Setup Environment Variables:
    - OPENAI_API_KEY: This token is used by APIs of OpenAI. In case you don't have an OpenAI account, you would need to create one to get your access token.
    - REPLICATE_API_KEY: 

2. Login Setup:
    - aws_configure: This is required since we use S3 to download and upload some files. You need to run `aws configure` and login using your `AWS_ACCESS_KEY` and `AWS_SECRET_KEY`
    - hugging_face_cli_login: If the dreambooth fine tuned model you want to use is in a private repo on the HF Hub then login using `huggingface-cli login` command
    - wandb login: Download pretrained checkpoint of SymphonyNet from Weights & Biases model registry.

3. SymphonyNet Model Dependencies:
    - Install FludioSynth: This is required for midi file conversion to mp3. You can install it by simply running `sudo apt install -y fluidsynth`
    - Download Sound Font: This is again required for midi to mp3 file conversion. Navigate to the `backend/sound_font` folder and run `wget ftp://ftp.osuosl.org/pub/musescore/soundfont/MuseScore_General/MuseScore_General.sf2`

### Core App Setup:

1. **Setting up UI:** To start the front-end, please navigate to the `ui` folder and run the following commands:
    `npm install` followed by `npm start`. This should launch the UI for our app on port 3000.
    Before running above commands, please ensure that you have `nodejs` and `npm` installed. In case, you don't then use the following commands to install it:
    ```shell 
        sudo apt-get update
        sudo apt install nodejs
        sudo apt install npm
    ```

2. **Setting up Backend:** To start the backend server for our web app, first create a python virtual environment in which you can install all the dependencies needed to run the application.
After that navigate to the `backend` folder and run `pip install -r requirements.txt`.
Since the music generation APIs depend on some external modules (SymphonyNet model), you need to install the dependencies corresponding to that as well. Navigate to the `ml/SymphonyNet` folder and run `pip install -r requirements.txt` here as well.
Now, navigate back to the `backend` folder and run `uvicorn app:main --reload` or simply run `python main.py` to start
the backend server.

3. 
