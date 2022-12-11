import wandb
from wandb.beta.workflows import use_model
import torch


def get_music_gen_model(project_name:str = "SymphonyNet"):
  """
  This function downloads the SymphonyNet pretrained checkpoint from Weights & Biases model registry
  Args:
    project_name (str): Name of project on Weights & Biases account under which SymphonyNet checkpoint was registered
  Returns:
    model_path (str): Path of the downloaded model file
  """
  model_collection_name = "Symphony"
  # Startup a W&B Run
  wandb.init(project=project_name, 
    job_type="model_inference",
  )

  model_art = wandb.use_artifact(f"{model_collection_name}:latest")
  model_path = model_art.get_path("checkpoint_last_linear_4096_chord_bpe_hardloss1_PI2.pt").download()
  # model_obj = torch.load(model_path)

  wandb.finish()
  return model_path