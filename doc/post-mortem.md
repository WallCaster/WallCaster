# Risks encountered and countermeasures to mitigate

During sprint 0, we didn't know how to work with the configuration of the raspberry, both to connect to the wifi and to open the web browser in fullscreen.
Being able to test would have helped to complete the analysis report, for the system sequence diagram.

# Lessons learned, best practices

## Retrospective (02/14/2023) - End of sprint 1

`The good points :`

- Final product finished in time with most of the wanted features.
- Good estimation of the time needed for each task.
- Use of docker to facilitate development.
- Roles well defined (each person always had something to do)

`The bad points :`

- Integration of the complicated filters just before the end.
- The merge of the work of each person was more complicated than expected, bad estimation of time.

`The neutral points :`

- Reorganisation of the project architecture (moving the filter part to an external Python project) after talking with the products owners.

`Areas for improvement :`

- Be more careful and better anticipate the time of fusion of the works.

## Retrospective (03/28/2023) - End of sprint 2

`The good points :`

- We finished the sprint in time and the demo was a success.

`The bad points :`

- We previously planned to finish this sprint in 5 weeks but we finished it in about 3 weeks. We did not planned the time well and finished early. That is why we had to added some extra features.

`Areas for improvement :`

- We had to rethink the AI filter and decided to scrap it for a new a more performant filter for the next sprint.

- This led to a lot of work in the last week since everything had to be done in a short time for the demo of the product (like the photo implementation).

- We have to be more careful with the time estimation for the future sprints. After brainstorming with the full team, we think that this bad estimation of time is due to a bad estimation of the difficulty of the tasks and so the time needed to do them. Also, in the last sprint, we spend a lot of time on the merge of the work of each person. But this time it has been not as bad as the previous one. So, to improve this, we have to think more about the time needed for each task and not overestimate the merge time.

## Retrospective (DATE TO ADD WHEN THE END WILL BE KNOW) - End of sprint 3

Il était exprimé dans le cahier des charges que l'utilisateur puisse choisir de récupérer du contenu d'Instagram (des posts) suivant des hashtags qu'il aurait donnés.
En se rendant sur le site développeur de [Meta](https://developers.facebook.com/docs/instagram-api/guides/hashtag-search/), il existe l'API *Hashtag Search* qui correspond à nos besoins : 
- sur une période de 7 jours il est possible d'interroger 30 hashtags uniques d'un compte [Instagram Buisiness](https://business.instagram.com/getting-started?locale=fr_FR) ou [Creator](https://help.instagram.com/2358103564437429).
- cependant un compte Instagram Basic ne fonctionne pas

Il réside cependant deux problèmes majeurs : 
- il faut disposer de l'autorisation [instagram_basic](https://developers.facebook.com/docs/permissions/reference/instagram_basic)
- ainsi que de la fonctionnalité [Instagram Public Access Content](https://developers.facebook.com/docs/features-reference/instagram-public-content-access)
Cependant pour les obtenir il faut soumettre l'entiereté de notre application au processus [Contrôle App](https://developers.facebook.com/docs/app-review) de Meta. Le processus est très pointilleux et lourd à mettre en place, nous ne pensons pas avoir le temps de demander les autorisations à Meta (la demande est traitée en quelques jours), en espérant une réponse positive pour ensuite finir d'implémenter cette partie de notre application. Sachant qu'il faudra derrière tester.

Nous aurions pu, dû même anticiper ce problème en préparant la demande bien en amont (en commençant les démarches dès le sprint 1) et ne pas attendre le dernier sprint. Après notre logiciel a tellement évolué qu'il était dur au début de soumettre une version du sprint 1 à Meta.

L'ancienne API Instagram qui pouvait être interrogée facilement a été supprimée par [Meta](https://developers.facebook.com/blog/post/2018/01/30/instagram-graph-api-updates/) progressivement depuis 2018.