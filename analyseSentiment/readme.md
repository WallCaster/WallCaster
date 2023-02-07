Tout d'abord,install the NLTK package avec le gestionnaire de packagespip: 
**pip install nltk==3.3**

Commencez par démarrer une session interactive Python en exécutant la commande suivante: 
**python3**

Ensuite, importez le modulenltk dans l'interpréteur python. et télécharger les données nécessaires pour l'analyse de sentiment avec les commandes suivantes:
```python 
import nltk
nltk.download('twitter_samples')
nltk.download('stopwords')
nltk.download('averaged_perceptron_tagger')
nltk.download('wordnet')
```

Pour lancez le script, exécutez la commande suivante:
**python3 nlp_test.py**