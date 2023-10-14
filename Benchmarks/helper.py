"""
Helper module for Benchmarking Language models
"""
from typing import LiteralString

class Benchmark():
    def __init__(self, model_path:LiteralString, data_path: LiteralString, bitext_folder=["Hindi","English"]):
        """
        Initialize Benchmark class.

        Benchmark class is the main class that contains helper functions to be used.

        in __init__ we initialize the models using transformers.pre_trained() class.
        """
        self.model_path = model_path
        self.data_path = data_path
        self.bitext_folder = bitext_folder
        self.english = []
        self.hindi = []

    def pre_process(self):
        """
        This function must do pre-processing of XML files.
        Note: All corresponding files in English and Hindi are named same.

        example: 1.xml in hindi and 1.xml in english are same except for language.

        1. Loop through all contents in English and Hindi folder.
        2. Read corresponding XMLS in english folder as well as Hindi folder.
        3. parse by pages both the XMLS.
        4. Append page contents to self.english and self.hindi.

        """
    def translate(self, **kwargs):
        """
        This function must use the model under evaluation to translate text and return translated sentences.
        """

        pass

    def BLEU(self, **kwargs):
        """
        This function should calculate BLEU score for the given Dataset and model.

        Given reference sentences and corresponding predicted sentences find BLEU score.
        """
        pass

    def Similarity(self, **kwargs):
        """
        This function should calculate Contextual similarity between generated model predicted text and data from original dataset.

        Given reference sentences and corresponding predicted sentences find contextual-similarity using word embeddings (HINDI).
        """
        pass
