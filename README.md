# Project Submission for [AssemblyAI Hackathon](https://hackathon.assemblyai.com/) 

## Chords & Art - Your AI buddy for your Music needs

We're all aware of the tremendous progress made in the generative AI space recently. With our project, `Chords & Art` we have tried to leverage the recent advancements made in this area and applied to the domain of Music.
We thought it'll be extremely useful as well cool to have a project that could help address different needs that someone may have with respect to generation of music -- whether you want to write lyrics for a song, compose music or even generate cover art for your music piece -- we can help you with all of these :)
We think it's the kind of companion any music artist would want whose muse is being uncooperative.

### Technical Overview:
The project consists of 3 main modules:
1. **Lyrics Generation**: We leveraged OpenAI's GPT-3 model variant (da-vinci) to build this module.
2. **Cover Art Generation**: We used 2 models to support this module. We felt the [OpenJourney](https://replicate.com/prompthero/openjourney) model on Replicate itself is great and can generate a lot of images that can qualify as quality cover art. But, we thought it would be useful if we could also fine tune a Stable Diffusion model using Dreambooth on some popular music cover art and use that as well as part of our cover art module.
Check out this [space](https://huggingface.co/spaces/shivi/sd-album-covers-demo) on Hugging Face Hub to know more details of our custom model.
4. **Music Generation**: We used [SymphonyNet](https://github.com/symphonynet/SymphonyNet) to build this module. SymphonyNet is an open-source project that aims to generate complex multi-track and multi-instrument music like symphony. Their method is fully compatible with other types of music like pop, piano, solo music, etc. So using our music generation module, the user can upload a small composition of their choice and then SymphonyNet will model the input music sequence to generate the corresponding output music sequence.

### How we built it
It was a team effort with each of us looking into various modules that interested us and pitching in to build the app.
1. **Nitin Premanand** - handled everything related to the development of the frontend as well as integrating the backend APIs with the frontend of the web app.
2. **Harshini Krishnamurthy** - took care of setting up the backend for the application as well as working on setting up the lyrics generation module along with integrating [Replicate's openjourney](https://replicate.com/prompthero/openjourney) model for cover art generation.
3. **Shivalika Singh** - worked on fine tuning stable diffusion using Dreambooth for creating a [custom model](https://huggingface.co/shivi/sd-album-covers) for cover art generation along with setting up the music generation module of the project using [SymphonyNet](https://github.com/symphonynet/SymphonyNet).


### Challenges we ran into
1.  Figuring out how to fine tune stable diffusion for generating cool cover art with no prior experience using stable diffusion took us a little time. Thankfully this was less intimidating because of lot of useful resources created by Hugging Face such as [Dreambooth training](https://huggingface.co/blog/dreambooth).
2. We were also working with a recent music generation model called [SymphonyNet](https://symphonynet.github.io/) for the first time. Apart from understanding how to use the model, it also required some domain knowledge like what are midi files or sound fonts and how to convert midi files to mp3 files, etc in order to integrate the model with our app.
3. Figuring out right settings for good lyrics generation for using OpenAI's GPT-3 also took a bit of experimentation.


### Accomplishments that we're proud of
1. Our fine tuned model for music cover art
2. We were able to finish all the 3 modules we planned


### What we learned
We learnt a lot about how to leverage recent state-of-the-models for both unlocking human creativity and solving critical problems. 
1. With respect to backend and UI integration, working with audio files was a new thing for us. SymphonyNet model outputs midi files which we were having trouble playing using our app frontend. 
We had to figure out how to convert midi to mp3 files on the backend so that the audio can be rendered on the frontend.
2. Figuring out how to leverage models like GPT-3, Stable Diffusion and SymphonyNet for our use case was the core of what we learnt through this project and also about so many other applications that are feasible now thanks to such generative models.

### What's next for Chords & Art
At the moment, our lyrics, cover art and music generation modules are independent. Going forward we wish to integrate them together so that any music artist can create songs or compositions as a whole easily via the app.

### Built With
    - UI: CSS, HTML, React, Javascript
    - Backend: FastAPI
    - ML: OpenAI GPT3, Replicate, Stable Diffusion, SymphonyNet, Hugging Face, Weights & Biases


## Project Setup

### Prequisites:

1. Setup Environment Variables:
    - OPENAI_API_KEY: This token is used by OpenAI API used by lyrics generation module. In case you don't have an OpenAI account, you would need to create one to get your access token.
    - REPLICATE_API_KEY: This token is used by Replicate which is used as part of cover art generation module. In case you don't have a Replicate account, you would need to create one to get your access token.

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
