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

## Retrospective (04/18/2022) - End of sprint 3

### Adding more media types

It was expressed in the specification that the user could choose to retrieve content from Instagram (posts) following hashtags they gave.
By going to the developer site of [Meta](https://developers.facebook.com/docs/instagram-api/guides/hashtag-search/), there is the *Hashtag Search* API which corresponds to our needs: 
- over a period of 7 days it is possible to query 30 unique hashtags from an [Instagram Buisiness](https://business.instagram.com/getting-started?locale=fr_FR) or [Creator](https://help.instagram.com/2358103564437429) account.
- but an Instagram Basic account does not work.

However, there are two major problems: 
- you need the [instagram_basic](https://developers.facebook.com/docs/permissions/reference/instagram_basic) authorization
- as well as the [Instagram Public Access Content](https://developers.facebook.com/docs/features-reference/instagram-public-content-access)

In order to do get these we need to submit our entire application to Meta's [App Review](https://developers.facebook.com/docs/app-review) process. The process is very fussy and cumbersome to set up, we don't think we have time to ask Meta for the authorisations (the request is processed in a few days), hoping for a positive response to then finish implementing this part of our application. Knowing that it will be necessary to test behind.

We could, and should, have anticipated this problem by preparing the request well in advance (by starting the process in Sprint 1) and not waiting for the last sprint. Afterwards, our software evolved so much that it was hard at first to submit a sprint 1 version to Meta.

The old Instagram API that could be queried easily has been deleted by [Meta](https://developers.facebook.com/blog/post/2018/01/30/instagram-graph-api-updates/) since 2018.

The observation is similar to Facebook. Need to go through the `App Review`.

### Use of Raspberry Pi

The use of Raspberry Pi was originally planned for the project, but unfortunately, we encountered difficulties in obtaining one, which resulted in this aspect of the project being abandoned. 

If we had been able to procure a Raspberry Pi, we could have tested the software on it to determine its functionality. However, this was not a major issue as we were able to test the software on a computer or any other device that supports a web browser.