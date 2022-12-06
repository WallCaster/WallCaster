# Implementation principle of the solution (how)

![Excalidraw diagram architecture](assets/Architecture.excalidraw.svg)

# Architecture rules
# Static model : packages organization, main classes descriptions and their responsabilities


## Server Backend
```mermaid
classDiagram
class App {
  -Config config
  -Filter filter
  -Socket socket
  -Post[] cache
  -API[] apis

  +main()
}

class Filter {
  TODO 
}

class Socket {
  const socket
  emit()
  on() 
}

class Config {
  List[String] forbiddenWords
  int numberOfScreens
  int dateRange
  bool allowSound
  List[String] whiteListAuthors
  List[String] whiteListHashtag
  

}

class Post {
  -String content
  -String author
  -Date date
  -String url
  -PostImage image
  -SocialNetwork source
  +Post(String content, String author, Date date, String url, PostImage image, SocialNetwork source)
  +Post(String content, String author, Date date, String url, SocialNetwork source)
  +toString()
}

class PostImage {
  -String url
  +PostImage(String url)
  +getURL()
}

class SocialNetwork {
  <<enum>>
  TWITTER
  INSTAGRAM
  FACEBOOK
  LINKEDIN
}

class API {
  TODO
}

class TwitterAPI {
  TODO 
}


App ..> Filter
App ..> Socket
App --o Config
TwitterAPI --|> API
InstagramAPI --|> API
LinkedinAPI --|> API
FacebookAPI --|> API
App ..> TwitterAPI
App ..> InstagramAPI
App ..> LinkedinAPI
App ..> FacebookAPI
Post ..> PostImage
Post ..> SocialNetwork

```


## Frontend Clients

```mermaid
classDiagram
class App {
  -Boolean isConnected
  -Post currentPost
  -Post previousPost
  -onConnect()
  -onDisconnect()
  -onMount()
  -onUnmount()
  -onNewPost()
}
```

## Frontend Administration

```mermaid
classDiagram
class App {
  -Boolean isConnected
  -Config config
  -onConnect()
  -onDisconnect()
  -onMount()
  -onUnmount()
  -onChangeConfig()
}
```

# Dynamic model : events streams, nominal and error-related, startup and shutdown
# Explaination about analysis constrains consideration
# Production frame : development, configuration and deployment tools.

## Development tools

- Git / GitHub
- CI

## Configuration tools

## Deployment tools

- Docker 
