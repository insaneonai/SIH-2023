import torch
from transformers import pipeline
import bitsandbytes as bnb
from flask import Flask, request, jsonify
from helper import replace_8bit


app = Flask(__name__)
# run_with_ngrok(app)  # Start ngrok when app is run

oracle = pipeline(model="facebook/nllb-200-distilled-600M",
                  tokenizer="facebook/nllb-200-distilled-600M", 
                  device="cuda", 
                  torch_dtype=torch.float16)
oracle.tokenizer.padding_side = "left"
oracle.model = replace_8bit(oracle.model)
torch.cuda.empty_cache()

@app.route("/translate", methods=["GET"])
def hello():
    args = request.args
    if not args or args.get("English_text") == "":
        return jsonify({"Code": 200, "response": "Please input some text"})
    inputs = oracle.tokenizer(args.get("English_text"), return_tensors="pt")
    inputs.to("cuda")
    translated_tokens = oracle.model.generate(
        **inputs, forced_bos_token_id=oracle.tokenizer.lang_code_to_id["hin_Deva"], max_length=120)
    text = oracle.tokenizer.batch_decode(
        translated_tokens, skip_special_tokens=True)[0]
    torch.cuda.empty_cache()
    return jsonify({"Hindi_text": text})


if __name__ == '__main__':
    app.run()
