
# Rappel du besoin et critères de succès

## Specifications

- Slideshow on interval of predefined images
- Configurable : 
  - Blacklist
  - Whitelist
  - Date range
  - Number monitor
  - Allow image, sound video, video, audio
- Manual moderation possibility

# Modèle du domaine métier : modèle UML des notions manipulées, relations et explications

## Use case diagram

![Use case diagram](assets/usecase.png)

# Description de l'écosystème : présentation des éléments avec lesquels le système va devoir s'intégrer, des contraintes à respecter
4 Social Media API (Twitter, LinkedIn, Facebook, Instagram) 
Notre système va devoir communiquer avec divers API de réseaux sociaux afin d'en récupérer les posts (textes et images) correpondant à un mot clé donné.

#### API Twitter :
  - Contraintes :
    - Authentification via un compte développeur

#### API LinkedIn : 
  - Contraintes :
    - Authentification via un compte développeur

#### Graph API Instagram Search hastag inclus dans le Facebook SDK:
  - Processus : 
    - Créer une application Facebook
    - Configurer l'application et les différentes permissions requises afin d'en récupérer un Access token
    - Authentification Instagram
    - Requêtes de récupération de posts par #hashtag
  - Contraintes :
    - Avoir un compte développeur Facebook 
    - Avoir un compte développeur Instagram

#### Graph API Facebook :
  - Contraintes :
    - Impossibilité de récupérer le feed public Facebook via le Facebook SDK donc trouver une alternative

#### API de filtrage des posts selon plusieurs critères

#### Raspberry PI :
  - Micro-ordinateur permettant d'afficher un contenu web 
  - Chaque Raspberry PI est relié à un écran afin d'y afficher un contenu spécifique
  - Connexion à tous les raspberry PI correspondant aux écrans de la conférence.
  - Contraintes : 
    - Avoir une connexion WiFi

#### Serveur persistant :
  - Hébergement sur les serveurs de l'IRISA afin qu'il puisse être accessible en dehors du campus.
  - Stockage de la configuration de l'administration
  - Stockage des posts à afficher
  - Contraintes : 
    - Avoir une connexion WiFi


# Principe de solution : description externe de la solution proposée (le quoi, pas le comment)


# Problematics

- How to filter : anti-spam, nsfw filter 
- What to show ? Hashtag ? User ? Location ?




# User Story

- Setup the raspberry pi with wifi and correct origin

