## This is a standalone script and you can use it to log the pretrained model checkpoint 
## with Weights & Biases Model registry.
## Edit the `model_ckpt_path` depending on the location where the ckpt 
## is placed before running this script.

import wandb
from wandb.beta.workflows import log_model, link_model
import torch

project_name = "SymphonyNet"
model_collection_name = "Symphony"
model_ckpt_path = f"SymphonyNet/ckpt/checkpoint_last_linear_4096_chord_bpe_hardloss1_PI2.pt"

def log_music_gen_model():
  """
  This function lets you log the pretrained SymphonyNet model checkpoint to Weights & Biases model registry
  """

  # Startup a W&B Run
  wandb.init(project=project_name, 
    job_type="log_trained_model",
  )

  is_best = True 
  art = wandb.Artifact(f"symphonynet-{wandb.run.id}", "model")
  art.add_file(model_ckpt_path)
  wandb.log_artifact(art, aliases=["best", "latest"] if is_best else None)
  wandb.run.link_artifact(art, model_collection_name, ["latest"])

  # Finish the Run
  wandb.finish()

if __name__ == '__main__':

  log_music_gen_model()
  