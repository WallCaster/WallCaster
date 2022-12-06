# Implementation principle of the solution (how)

![Excalidraw diagram architecture](assets/Architecture.excalidraw.svg)

# Architecture rules
# Static model : packages organization, main classes descriptions and their responsabilities


## Server Backend
```mermaid
classDiagram
class App {
  - Config config
}

class Filter {
  TODO 
}

class Query {
  TODO 
}

class Socket {
  const socket
  emit()
  on() 
}

class Config {

    -int numberOfScreens
    -int dateRange
    -List[String] forbiddenWords
    -List[String] whiteListAuthors
    -List[String] whiteListHashtags
    -List[SocialNetwork] socialNetworkAccepted
    -bool allowSound
    -bool allowVideo
    -bool allowImage
  
    bool writeConfigToFile(String nameFile)
    bool readConfigFromFile(String nameFile)
    bool save()
    Config getInstance()
}

class Post {
  -String content
  -String author
  -String date
  -String url
  -PostImage image
  -SocialNetwork source
  +Post(String content, String author, String date, String url, PostImage image, SocialNetwork source)
  +Post(String content, String author, String date, String url, SocialNetwork source)
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
