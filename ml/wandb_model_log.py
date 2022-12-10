import wandb
from wandb.beta.workflows import log_model, link_model
import torch


project_name = "SymphonyNet"
model_collection_name = "Symphony"

# Startup a W&B Run
wandb.init(project=project_name, 
  job_type="log_trained_model",
)

is_best = True 
art = wandb.Artifact(f"symphonynet-{wandb.run.id}", "model")
art.add_file(f"checkpoints/checkpoint_last_linear_4096_chord_bpe_hardloss1_PI2.pt")
wandb.log_artifact(art, aliases=["best", "latest"] if is_best else None)
wandb.run.link_artifact(art, model_collection_name, ["latest"])

# Finish the Run
wandb.finish()