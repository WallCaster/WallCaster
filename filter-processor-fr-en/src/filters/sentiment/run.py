import re
import spacy
import pickle

from pathlib import Path
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem.snowball import SnowballStemmer
from sklearn.feature_extraction.text import TfidfVectorizer


path = Path(__file__).parent / "trained_data.pickle"
with path.open("rb") as file:
    classifier = pickle.load(file)


# this function will remove noise from the tweets in french or english such as punctuation
# , stopwords, hyperlinks, mentions, etc.
def preprocess_tweet(text, lang):
    # Supprimer les mentions, les hashtags et les liens
    text = re.sub(r'@\w+|#\w+|https?://\S+', '', text)
    # Supprimer les caractères spéciaux
    text = re.sub(r'[^\w\s]', '', text)
    # Convertir en minuscules
    text = text.lower()
    # Tokenisation
    if lang == 'fr':
        tokens = word_tokenize(text, language='french')
    elif lang == 'en':
        tokens = word_tokenize(text, language='english')
    # Supprimer les stopwords
    stop_words = set(stopwords.words(lang))
    filtered_tokens = [token for token in tokens if token not in stop_words]
    # Stemming ou lemmatisation
    if lang == 'fr':
        stemmer = SnowballStemmer('french')
        preprocessed_text = ' '.join([stemmer.stem(token) for token in filtered_tokens])
    elif lang == 'en':
        nlp = spacy.load('en_core_web_sm')
        preprocessed_text = ' '.join([token.lemma_ for token in nlp(' '.join(filtered_tokens))])

    return preprocessed_text

def isPositive(text, lang):
    preprocessed_text = preprocess_tweet(text, lang)

    # charger le vectorizer
    path = Path(__file__).parent / "vectorizer.pickle"
    with path.open("rb") as file:
        vectorizer = pickle.load(file)

    # Ajuster le TfidfVectorizer aux données d'entraînement et le transformer avec le nouveau texte
    vectorized_text = vectorizer.transform([preprocessed_text])

    # Utiliser le modèle entraîné pour faire la prédiction
    res = classifier.predict(vectorized_text)[0]
    if res == 1:
        return "positive."
    else:
        return "negative."


if __name__ == '__main__':
    print("Ready to process sentences. (Ctrl+C to exit)\n")

    while True:
        text = input("Enter a sentence: ")
        lang = input("Enter the language (fr/en): ")
        print("The result is: ", isPositive(text, lang), end="\n\n")


