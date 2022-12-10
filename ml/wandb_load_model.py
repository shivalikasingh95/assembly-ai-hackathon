import wandb
from wandb.beta.workflows import use_model
import torch

# Startup a W&B Run
wandb.init(project=project_name, 
  job_type="model_inference",
)

model_art = wandb.use_artifact(f"{model_collection_name}:latest")
model_path = model_art.get_path("checkpoint_last_linear_4096_chord_bpe_hardloss1_PI2.pt").download()
model_obj = torch.load(model_path)

wandb.finish()