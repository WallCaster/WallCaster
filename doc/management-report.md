# Rappel des besoins et des éléments principaux de la solution

Our solution consist of a software and a hardware part. The software part is a web application that will be used to configure the content to display dynamically. The hardware part are multiples RaspberryPi devices that are connected to the monitors to display the selected content.

From a software point of view, we have the following services:
- Backend server retrieving posts from different social networks by applying behavioral filters and ban words filters
- Frontend client displaying posts on different screens linked to a RaspberryPi
- Frontend administrator providing the configuration that the backend must take.

# Estimation (planning, ressources) et description du déroulement du projet (démarche, jalons, outils, réunions)

For the progress of the project, we use the agile project management method using a Kanban (directly accessible via the github project) to define the tasks of the current sprint. In addition, a meeting (daily) is held at each start of TP in order to agree on the progress of tasks. Finally, at the end of each TP, another meeting is held to distribute any tasks that we can advance before the next lab session.

# Description des rôles et des responsabilités

TODO for Louis-Gabriel

# Gestion du déroulement du projet (suivi du planning, comptes rendus de réunions...)

## Compte-rendu de réunions

### 11/29/2022 with Zoltan MIKLOS

Filtrage : problème ambiguïté des mots 
Combiner des outils existants, et les adapter.
Transfer Learning (réentrainement modèle existant)
Ou mettre le modèle ? (coté front ou back)
Quels comptes surveiller ?
Filtrer le contenu inutile et les fakes (fausses conférences qui usurpent l'identité des personnes pour les faire payer)
Plusieurs couches de filtrage (manuelle (modérateur) et automatique). Par mots-clés.

### 12/06/2022 with Benoît COMBEMALE

Objectif du jour : sprint 0, ce matin document d'analyse, cet après-midi document d'architecture.
Mise en place, choix des outils de dev, gestion de projet, choix des librairies.
Définir un scrum master qui s'assure que tout le monde sait quoi faire à chaque moment.
Si jamais des questions sur le filtrage, demander Z.Miklos.

### 12/13/2022 with Benoît COMBEMALE (morning)

Faire sous cas diagramme use case,
Mode publish/subscribe : maintenir une liste de clients en permanence => un peu overkill selon Benoît Combemale.
Refaire diagramme avec norme UML document architecture, les calculs dans le client ou dans le serveur ?
Un diagramme de composants et un de déploiement.
Client directement dans les raspberry ?
Mettre le frontend dans le serveur ?
Le back expose une page web. 
Faire un docker-compose à la fin.
Pour les user stories :
    Change filter diffusion : ajouter une user story pour ajouter mots bannis
    Set-up Raspberry-pi : refaire : "As an admin I want to convert the client to the server."
    Manage phots : le photographe a-t-il un rôle à part ou alors il donne ses photos à l'admin qui gère tout, dans ce as il disparaît ?
    Extraire posts : refaire du point de vue de l'utilisateur, ce qui est marqué est une tâche implicite d'une user story
    Filtrage des posts : détailler beaucoup plus, notamment au niveau du réseau de neurones, ce qu'il prend en entrée... 
    
Est-ce que les mots bannis ne sont-ils pas à apprendre par le réseau de neurones car cela peut être long et fastidieux pour l'admin de faire tout le dictionnaire.

Pour le filtrage, pas forcément pour le premier prototype, mais regarder s'il y a déjà des modèles préentraînés pour filtrer du contenu explicite.

### 12/13/2022 with Benoît COMBEMALE and Johann BOURCIER (afternoon)

Revoir les diagrammes de composants et de déploiement.
Attention : REST est sans état. Faire du RESTFull ou changer d'API.
Diagramme de composants : mettre la liste des méthodes utilisées pour la connexion entre deux composants.

### January 2023

The beginning of the month was dedicated to the oral training and presentation **(01/06/2023)**. Then some rest dedicated to the end of the semester.

### 02/01/2023

No meeting with our project owners.

### 02/07/2023 with Johann BOURCIER

Ne pas utiliser le terme prototype, mais produit, car il est final avec peu de fonctionnalités.
Faire les tests à chaque sprint, sur les fonctionnalités implémentées.
Être précis sur les fonctionnalités attendues car elles seront revues à la revue de sprint.
Définir la date de fin de sprint (impérativement), quoiqu'il arrive. Le but est de pouvoir s'évaluer. L'objectif est de bien gérer le projet.
Attention tâches (dev) != fonctionnalités (clients).

# Description et gestion des exigences