from nltk.tokenize import word_tokenize
from train import remove_noise
from pathlib import Path
import pickle

path = Path(__file__).parent / "trained_data.pickle"
with path.open("rb") as file:
    classifier = pickle.load(file)

def is_positive(txt: str):
    tokens = remove_noise(word_tokenize(txt))
    return classifier.classify(dict([token, True] for token in tokens))

if __name__ == "__main__":
    print(is_positive("I love you"))