import re
import spacy
import pickle
import pandas as pd
from pathlib import Path

from nltk.corpus import stopwords
from nltk.tokenize import punkt
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem.snowball import SnowballStemmer

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

# this function is used to create a dataframe from the data from 2 files csv , one in english and one in french
def create_dataframe():
    df_tweets_fr = pd.read_csv('../data/french_tweets.csv', sep=',', encoding='utf-8')
    df_tweets_en = pd.read_csv('../data/english_tweets.csv', sep=',', encoding='ISO-8859-1')

    # keep only 50 tweets randomly for each language
    df_tweets_fr = df_tweets_fr.sample(n=7500, random_state=1)
    df_tweets_en = df_tweets_en.sample(n=7500, random_state=1)

    # rename columns df_tweets_en ['label', 'id', 'Date', 'Query', 'Username', 'tweet']
    df_tweets_en = df_tweets_en.rename(columns={
        '0': 'label',
        '1467810369': 'id',
        'Mon Apr 06 22:19:45 PDT 2009': 'Date',
        'NO_QUERY': 'Query',
        '_TheSpecialOne_': 'Username',
        "@switchfoot http://twitpic.com/2y1zl - Awww, that's a bummer.  You shoulda got David Carr of Third Day to do it. ;D": 'tweet'
    })

    # rename columns df_tweets_fr ['label', 'text']
    df_tweets_fr = df_tweets_fr.rename(columns={
        'text': 'tweet',
    })

    # add column 'language' to df_tweets_en and df_tweets_fr
    df_tweets_en['lang'] = 'en'
    df_tweets_fr['lang'] = 'fr'

    # fill 'en' in column 'language' of df_tweets_en and 'fr' in column 'language' of df_tweets_fr
    df_tweets_en['lang'] = df_tweets_en['lang'].fillna('en')
    df_tweets_fr['lang'] = df_tweets_fr['lang'].fillna('fr')

    # create a new dataframe with the tweets and the labels
    df_tweet = pd.concat([df_tweets_fr[['label', 'tweet','lang']], df_tweets_en[['label', 'tweet', 'lang']]], ignore_index=True, axis=0)

    # remplace 4 by 1
    df_tweet['label'] = df_tweet['label'].replace(4, 1)

    # split the data into train and test
    train_data, test_data = train_test_split(df_tweet, test_size=0.2, random_state=42)

    return train_data, test_data

# this function is used to preprocess the data (remove stopwords, punctuation, etc.)
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

if __name__ == '__main__':
    train_data, test_data = create_dataframe()
    # Prétraitement des données d'entraînement
    preprocessed_train_data = train_data.apply(lambda x: preprocess_tweet(x['tweet'], 'en' if x['lang'] == 'en' else 'fr'), axis=1)
    train_labels = train_data['label']

    # Prétraitement des données de test
    preprocessed_test_data = test_data.apply(lambda x: preprocess_tweet(x['tweet'], 'en' if x['lang'] == 'en' else 'fr'), axis=1)
    test_labels = test_data['label']

    # tranformer les tweets prétraités en vecteurs de fonctionnalités numériques qui peuvent être utilisés par les algorithmes d'apprentissage automatique
    vectorizer = TfidfVectorizer()
    train_features = vectorizer.fit_transform(preprocessed_train_data)
    test_features = vectorizer.transform(preprocessed_test_data)

    # entraîner un modèle de classification
    classifier = LogisticRegression()
    classifier.fit(train_features, train_labels)

    # évaluer le modèle
    predictions = classifier.predict(test_features)
    print('Accuracy: ', accuracy_score(test_labels, predictions))
    print('Classification report: ', classification_report(test_labels, predictions))

    # save the classifier
    path = Path(__file__).parent / "trained_data.pickle"
    with path.open("wb") as file:
        pickle.dump(classifier, file)

    # save the vectorizer
    path = Path(__file__).parent / "vectorizer.pickle"
    with path.open("wb") as file:
        pickle.dump(vectorizer, file)
