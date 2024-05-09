import torch
from accelerate import init_empty_weights


def replace_8bit(model,threshold=6.0,model_not_to_convert="lm_head"):
  """
  Post Quantization.
  """
  for name,module in model.named_children():
    if len(list(module.children())) > 0:
      replace_8bit(module,threshold,model_not_to_convert)

    if isinstance(module,torch.nn.Linear) and name != model_not_to_convert:
      with init_empty_weights():
            model._modules[name] = bnb.nn.Linear8bitLt(
            module.in_features,
            module.out_features,
            module.bias is not None,
            has_fp16_weights=False,
            threshold=threshold,
        )
    return model