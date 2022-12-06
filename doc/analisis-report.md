# Analisis Report

# Table of contents 

- [Analisis Report](#analisis-report)
- [Table of contents](#table-of-contents)
- [1 - Rappel du besoin et critères de succès](#1---rappel-du-besoin-et-critères-de-succès)
  - [1.1 - Specifications](#11---specifications)
  - [1.2 - Critères de succès](#12---critères-de-succès)
- [2 - Modèle du domaine métier : modèle UML des notions manipulées, relations et explications](#2---modèle-du-domaine-métier--modèle-uml-des-notions-manipulées-relations-et-explications)
  - [2.1 - Use case diagram](#21---use-case-diagram)
  - [2.2 - Diagrame de Séquence Système](#22---diagrame-de-séquence-système)
    - [2.2.1 - Manage photos](#221---manage-photos)
    - [2.2.2 - Extraire\_Posts](#222---extraire_posts)
    - [2.2.3 - Filtrage des posts](#223---filtrage-des-posts)
    - [2.2.4 - Sequence Supprimer post](#224---sequence-supprimer-post)
    - [2.2.5 - Change Filtre Diffusion](#225---change-filtre-diffusion)
  - [2.3 - User Story](#23---user-story)
- [3 - Description de l'écosystème : présentation des éléments avec lesquels le système va devoir s'intégrer, des contraintes à respecter](#3---description-de-lécosystème--présentation-des-éléments-avec-lesquels-le-système-va-devoir-sintégrer-des-contraintes-à-respecter)
- [5 - Principe de solution : description externe de la solution proposée (le quoi, pas le comment)](#5---principe-de-solution--description-externe-de-la-solution-proposée-le-quoi-pas-le-comment)


# 1 - Rappel du besoin et critères de succès

## 1.1 - Specifications

- Slideshow on interval of predefined images
- Configurable : 
  - Blacklist
  - Whitelist
  - Date range
  - Number monitor
  - Allow image, sound video, video, audio (attention au volume de l'audio et à la pertinence de sa diffusion)
  - Ne pas forcément diffuser le même contenu sur tous les écrans (paramètre random), à condition d'avoir suffisament de matériels visuels.
- Modération automatique mais aussi possibilité d'intervenir en second temps pour modérer manuellement, apply spam filtering (pour éviter l'ambiguïté des mots, filtrer le contenu inutile et les fausses conférences, usurpant l'identité des personnes pour les faire payer). Filtrage par mots-clés/hastags/dates. 
- Have a nice visualization. Eviter de diffuser trop peu d'images trop souvent et éviter la redondance. En début de conférence, s'il n'y a pas suffisament de matériel visuel, possibilité de prendre des posts sur les réseaux sociaux précédent la conférence (annonce des participants, rappels des thématiques).
- Collect content according to given query and sources, for instance : LinkedIn, Instagram, Facebook/Meta, Twitter). 
 
**Bonus** : Si la conférence est sur plusieurs jours, possibilité que le photographe officiel puisse diffuser les images prises la veille sur les écrans. 

## 1.2 - Critères de succès

- La specification est completement effectuée
- La deadline est respectée
- Le software fonctionne correctement (pas de bogues)
- Les critères de test sont validés
  
# 2 - Modèle du domaine métier : modèle UML des notions manipulées, relations et explications

## 2.1 - Use case diagram

![Use case diagram](assets/Use_Case_Diagram.png)

## 2.2 - Diagrame de Séquence Système

### 2.2.1 - Manage photos

- Scenario Nominatif

```mermaid
sequenceDiagram
  actor Admin 
  participant S as WallCaster
  Admin ->> S : Connexion au frontend d'administration
  S ->> Admin : Affiche la page d'administration
  Admin ->> S : Upload une photo à ajouter à la liste
  S ->> Admin : Upload réussi
  Admin ->> S : Upload une photo à ajouter à la liste
  S ->> Admin : Upload réussi
  Admin ->> S : Quitte la page d'administration
```

- Scenario alternatif

```mermaid
sequenceDiagram
  actor Admin
  participant S as WallCaster

  Admin ->> S : Connexion au frontend d'administration
  S ->> Admin : Affiche la page d'administration
  Admin ->> S : Enlever la photo 2 de la liste
  S ->> Admin : Suppression réussi
  Admin ->> S : Quitte la page d'administration
```

- Scenario exception : photo trop lourde


```mermaid
sequenceDiagram
  actor Admin
  participant S as WallCaster

Admin -> S : Connection au frontend d'administration
S --> Admin : Affiche la page d'administration
Admin -> S : Upload une photo à ajouter à la liste
S --> Admin : L'upload a échoué l'image est trop lourde
```

- Scenario exception : erreur de connexion

```mermaid
sequenceDiagram
  actor Admin
  participant S as WallCaster

Admin -> S : Connection au frontend d'administration
S --> Admin : Affiche la page d'administration
Admin -> S : Upload une photo à ajouter à la liste
S --> Admin : L'upload a échoué, erreur de connexion
```
- Scenario exception : not found

```mermaid
sequenceDiagram
  actor Admin
  participant S as WallCaster

Admin -> S : Connexion au frontend d'administration
S --> Admin : Affiche la page d'administration
Admin -> S : Enlever la photo 2 de la liste
S --> Admin : La photo n'existe pas
Admin -> S : Quitte la page d'administration

```

### 2.2.2 - Extraire_Posts

Ensemble de scénarios correspondants aux requêtes du serveur vers les APIs des différents réseaux sociaux, afin de récupérer leur contenu (ou une erreur si requête mal formulée). 

- Scenario Nominatif

```mermaid
sequenceDiagram
  actor APIs
  participant Sys as WallCaster

Sys ->> APIs : Ask media contents
APIs ->> Sys : Sends media contents asked by APIs 

```

- Scenario exception : authentification token expired

```mermaid
sequenceDiagram
  actor APIs
  participant Sys as WallCaster

Sys -> APIs : Ask media contents
APIs --> Sys : Authentification error, token out of date. No media contents send.
```

- Scenario exception : no contents found

```mermaid
sequenceDiagram
  actor APIs
  participant Sys as WallCaster

Sys -> APIs : Ask media contents
APIs --> Sys : Error, no media contents found.
```

- Scenario exception : connection error

```mermaid
sequenceDiagram
  actor APIs
  participant Sys as WallCaster

Sys -> APIs : Ask media contents
APIs --> Sys : Connection error. No media contents send.
```
### 2.2.3 - Filtrage des posts


```mermaid
sequenceDiagram
  actor A as Admin
  participant W as WallCaster

  A ->> W : Se connecte au frontend d'administration
  W ->> A : Affiche la page d'administration
  A ->> W : Configure les paramètres de filtrage
  A ->> W : Valide la configuration

  W ->> A : Indique que la configuration a été enregistrée
```

### 2.2.4 - Sequence Supprimer post

- Scenario nominatif

Supprime automatiquement des posts à partir de l'analyse des sentiments

```plantuml
@startuml

actor Administarteur as Adm
participant WallCaster as Wl 


activate Adm
activate Wl


Adm -> Wl : choix supprimer post
Wl -> Adm : demander type filtrage à effectuer
Adm -> Wl : choix filtrage 
Wl -> Adm : Suppression effectuée

@enduml
```
```mermaid
sequenceDiagram
  actor A as Admin
  participant W as WallCaster

  A ->> W : Choix supprimer les posts
  W ->> A : Demande type sentiments à conservé
  A ->> W : Choix type
  W ->> A : Filtrage effectué
```

- Scenario Alternatif
Supprime manuellement les posts qui ont echappé l'analyse des sentiments 

```plantuml
@startuml

actor Administarteur as Adm
participant WallCaster as Wl 


activate Adm
activate Wl


Adm -> Wl : choix listes des posts en db
Wl -> Adm : affiche liste posts
Adm -> Wl : choix type
Wl -> Adm : Suppression effectuée

@enduml
```

```mermaid
sequenceDiagram
  actor A as Admin
  participant W as WallCaster

  A ->> W : choix listes des posts en db
  W ->> A : affiche liste posts
  A ->> W : Choix type
  W ->> A : Suppression effectuée
```

### 2.2.5 - Change Filtre Diffusion

```mermaid
sequenceDiagram
  title Scénario nominal Change_Filtre_Diffusion
  actor A as Administrateur
  participant W as WallCaster

  A ->> W : Connexion au front-end Web Administrateur
  W ->> A : Valider connexion admin
  A ->> W : Entrer les tags voulus
  W -->> W : Récupération des posts
  W ->> A : Confirmation des tags appliqués
  A ->> W : Suppression des tags enregistrés
  W -->> W : Récupération des posts
  W ->> A : Confirmation des tags appliqués

```
Ce premier diagramme présente le scénario où l'administrateur souhaite entrer des tags afin de filtrer les posts après s'être connecté au front end Web. L'administrateur peut aussi demander au système de modifier certains tags ou d'en supprimer.

```mermaid
sequenceDiagram
  title Scénario alternatif Change_Filtre_Diffusion
  actor A as Administrateur
  participant W as WallCaster

  A ->> W : Connexion au front-end Web Administrateur
  W ->> A : Erreur de connexion
  A ->> W : Connexion au front-end Web Administrateur
  W ->> A : Valider connexion admin
  A ->> W : Entrer les tags voulus
  W -->> W : Récupération des posts
  W ->> A : Confirmation des tags appliqués
  A ->> W : Suppression des tags enregistrés
  W -->> W : Récupération des posts
  W ->> A : Confirmation des tags appliqués
```
Le scénario alternatif serait une erreur de connexion.

```mermaid
sequenceDiagram
  title Scénario d'erreur Change_Filtre_Diffusion
  actor A as Administrateur
  participant W as WallCaster

  A ->> W : Connexion au front-end Web Administrateur
  W ->> A : Valider connexion admin
  A ->> W : Entrer les tags voulus
  W -->> W : Récupération des posts
  W ->> A : Erreur de connexion au serveur
  A ->> W : Tentative de connexion au serveur
  W ->> A : Impossible de se connecter au serveur
```
Le scénario d'erreur envisagé est une erreur de connexion au serveur impliquant une impossibilité d'appliquer ou de supprimer des tags.


## 2.3 - User Story

### 2.3.1 - Manage photos

### 2.3.2 - Extraire_Posts

En tant qu'APIs, nous souhaitons recevoir du serveur des requêtes bien formées de la part du serveur afin de lui fournir en retour le contenu des réseaux sociaux demandé.

### 2.3.3 - Filtrage des posts

- As an admin I can set parameters (keywords, ...) for the filter to block unwanted content

- As an admin I can manualy moderate content

### 2.3.4 - Sequence Supprimer post

### 2.3.5 - Change Filtre Diffusion

- As an admin I can set parameters (keywords, date, ...) for the posts to be searched by the API and shown on the website

--

- As an admin I can setup the raspberry pi to connect to the right wifi network so that it can access the website

- As an admin I can choose to show different content on different screens


# 3 - Description de l'écosystème : présentation des éléments avec lesquels le système va devoir s'intégrer, des contraintes à respecter


4 Social Media API (Twitter, LinkedIn, Facebook, Instagram) 
Notre système va devoir communiquer avec divers APIs de réseaux sociaux afin d'en récupérer les posts (textes et images) correpondants à un mot clé donné.

- API Twitter :
  - Contraintes :
    - Authentification via un compte développeur

- API LinkedIn : 
  - Contraintes :
    - Authentification via un compte développeur

- Graph API Instagram Search hastag inclus dans le Facebook SDK:
  - Processus : 
    - Créer une application Facebook
    - Configurer l'application et les différentes permissions requises afin d'en récupérer un Access token
    - Authentification Instagram
    - Requêtes de récupération de posts par #hashtag
  - Contraintes :
    - Avoir un compte développeur Facebook 
    - Avoir un compte développeur Instagram

- Graph API Facebook :
  - Contraintes :
    - Impossibilité de récupérer le feed public Facebook via le Facebook SDK donc trouver une alternative

- API de filtrage des posts selon plusieurs critères

- Raspberry PI :
  - Micro-ordinateur permettant d'afficher un contenu web 
  - Chaque Raspberry PI est relié à un écran afin d'y afficher un contenu spécifique
  - Connexion à tous les raspberry PI correspondant aux écrans de la conférence.
  - Contraintes : 
    - Avoir une connexion WiFi

- Serveur persistant :
  - Hébergement sur les serveurs de l'IRISA afin qu'il puisse être accessible en dehors du campus.
  - Stockage de la configuration de l'administration
  - Stockage des posts à afficher
  - Contraintes : 
    - Avoir une connexion WiFi


# 5 - Principe de solution : description externe de la solution proposée (le quoi, pas le comment)

Our solution consist of a software and a hardware part. 
The software part is a web application that will be used to configure the content to display dynamically.
The hardware part are multiples RaspberryPi devices connected to the monitors to display the selected content.

The content : 
- It consists of a slideshow of images and text (with a nice visualization) fetched from a social network (Twitter, Instagram, Facebook, LinkedIn, etc.)
- The content can be filtered by a set of rules (blacklist, whitelist, date range, number of monitor, allow image, sound video, video, audio, has explicit content, negative emotion, etc...)
- The content can be manually moderated by a human operator if needed.
- The content will be fetched according to a given query and sources and updated dynamically.
- If there is not enough content to display, allow user to select a set of images to display.