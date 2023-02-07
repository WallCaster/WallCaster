from nltk.tokenize import word_tokenize
from nlp_test import remove_noise, get_all_words, get_tweets_for_model

import pickle

with open('classifier.pickle', 'rb') as file:
    classifier = pickle.load(file)

# test the classifier
    custom_tweet = "hello world"
    while custom_tweet != 'exit':
        custom_tweet = input("Enter your tweet: ")
        custom_tweet_tokens = remove_noise(word_tokenize(custom_tweet))

        print(custom_tweet, classifier.classify(dict([token, True] for token in custom_tweet_tokens)))