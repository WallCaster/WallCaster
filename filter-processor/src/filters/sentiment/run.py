from nltk.tokenize import word_tokenize
from pathlib import Path
import pickle
from pathlib import Path
from nltk.stem.wordnet import WordNetLemmatizer
from nltk.tag import pos_tag
import re, string
import pickle


path = Path(__file__).parent / "trained_data.pickle"
with path.open("rb") as file:
    classifier = pickle.load(file)


# this function will remove noise from the tweets such as hyperlinks, mentions,
# and special characters using regular expressions and lemmatize the words
def remove_noise(tweet_tokens, stop_words=()):

    cleaned_tokens = []

    for token, tag in pos_tag(tweet_tokens):
        token = re.sub('http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+#]|[!*\(\),]|'\
                       '(?:%[0-9a-fA-F][0-9a-fA-F]))+','', token)
        token = re.sub("(@[A-Za-z0-9_]+)", "", token)

        if tag.startswith("NN"):
            pos = 'n'
        elif tag.startswith('VB'):
            pos = 'v'
        else:
            pos = 'a'

        lemmatizer = WordNetLemmatizer()
        token = lemmatizer.lemmatize(token, pos)

        if len(token) > 0 and token not in string.punctuation and token.lower(
        ) not in stop_words:
            cleaned_tokens.append(token.lower())
    return cleaned_tokens


def is_positive(txt: str) -> bool:
    tokens = remove_noise(word_tokenize(txt))
    res = classifier.classify(dict([token, True] for token in tokens))
    if res == "Positive":
        return True
    else:
        return False


if __name__ == "__main__":
    print(is_positive("I love you"))