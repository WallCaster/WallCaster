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
  -List~Post~ cache
  -List~API~ apis

  +App()
}

class Filter {
  +filter() List~Post~
  -filterByBlacklist() List~Post~
  -filterByWhitelist() List~Post~
  -filterByDate() List~Post~
  -filterByNegativeEmotion() List~Post~
  -removeImages() List~Post~
  -removeVideos() List~Post~
}

class Socket {
  -const socket
  +emit()
  +on() 
}

class Config {
  -int numberOfScreens
  -int dateRange
  -List~String~ forbiddenWords
  -List~String~ whiteListAuthors
  -List~String~ whiteListHashtags
  -List~SocialNetwork~ socialNetworkAccepted
  -bool allowSound
  -bool allowVideo
  -bool allowImage

  -writeConfigToFile(String nameFile) Boolean
  -readConfigFromFile(String nameFile) Boolean
  +save() Boolean
  +getInstance() Config
  +toString() String
}

class Post {
  -String content
  -String author
  -Date date
  -String url
  +Post(String content, String author, Date date, String url, PostImage image, SocialNetwork source)
  +Post(String content, String author, Date date, String url, SocialNetwork source)
  +toString() String
}

class API {
  <<abstract>>
  -String base_url
  -String api_key
  -List~String~ hashTag$
  +API(String base_url)*
  +searchPostFromHashtag()* Post
  +defineHashTag(String hashtag)$
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

class TwitterAPI {
  
}

class LinkedInAPI {
  
}

class InstagramAPI {
  
}

class FacebookAPI {
   
}

App --o Filter
App --o Socket
App --o Config
App --o API
Post "*" --> "0..1" PostImage : image
Post "1" --> "1" SocialNetwork : source
Filter "1" --> "1" Config : config
Filter "1" --> "*" Post : postsFiltered
API <|-- TwitterAPI
API <|-- LinkedInAPI
API <|-- InstagramAPI
API <|-- FacebookAPI

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
