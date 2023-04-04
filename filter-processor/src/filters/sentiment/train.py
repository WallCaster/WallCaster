from transformers import pipeline
import pickle
from pathlib import Path

# Require the requirements_train.txt packages

if __name__ == "__main__":
    classifier = pipeline('sentiment-analysis',
                      model='cardiffnlp/twitter-xlm-roberta-base-sentiment',
                      tokenizer='cardiffnlp/twitter-xlm-roberta-base-sentiment')
    
    # save the classifier
    path = Path(__file__).parent / "trained_data.pickle"
    with open(path, 'wb') as f:
        pickle.dump(classifier, f)