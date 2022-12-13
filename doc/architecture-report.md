# Implementation principle of the solution (how)

![Excalidraw diagram architecture](assets/Architecture.excalidraw.svg)

# Static model : packages organization, main classes descriptions and their responsabilities

## Component Diagram

<!-- en dessous le code plantuml pour générer le diagrame de déploiement -->
![Component](assets/component.svg)
```plantuml
@startuml component
[Frontend Admin] as FA
[Frontend Client] as FC
[Twitter API] as TW
[API Receiver] as API
[Filter] as F
[Server backend] as SB
[Navigator Admin] as NA
[Navigator Client] as NC
() "JSON" as JSON
() "Posts" as POSTS1
() "Posts" as POSTS2
() "Config" as CONFIG
() "HTML" as HTML1
() "HTML" as HTML2
() "Post" as POST

JSON -- TW
JSON <.. API
API -- POSTS1
POSTS1 <.. F
POSTS2 -- F
POSTS2 <.. SB
CONFIG <.. SB
FA -- CONFIG
SB -- POST
FC ..> POST


HTML1 <.. NA 
FA -- HTML1

NC ..> HTML2
HTML2 -- FC


@enduml

## Deployment Diagram
<!-- en dessous le code plantuml pour générer le diagrame de déploiement -->
![Deployement](assets/deployment.svg)
<!--
```plantuml
@startuml deployment
node "server" <<device>> as srv {
  node "server application" <<docker>> as cmp {
    component "backend" as bck
    component "client frontend" as cfr 
    component "admin frontend" as afr
    component "filter" as flt
  }
}

node "Raspberry Pi" <<device>> as rpi {
  component "web browser" as wb
}

bck #--# afr: ""<<Websocket>>""
bck #-# cfr: ""<<Websocket>>""
wb #--# cfr: ""1..n\n<<HTTP>>""
bck #--# flt: ""<<Websocket>>""
@enduml
```
-->
## Server Backend
```mermaid
classDiagram


class App {
  -cache : List~Post~ 
  -apis : List~API~ 

  +App()
  +addAPI(API api)
  +removeAPI(API api)
  +addPost(Post post)
  +removePost(int id)
}

class Filter {
  <<abstract>>
  +Filter(Config config)
  +apply(List~Post~ posts) List~Post~
}
class BanWordsFilter {
  +BanWordsFilter(Config config)
  +apply(List~Post~ posts) List~Post~
}
class NegativeFilter {
  +NegativeFilter(Config config)
  +apply(List~Post~ posts) List~Post~
}

class SocketServer {
  +SocketServer()
  +onConnect()
  +onDisconnect()
  +onNewPost()
  +onNewConfig()
  +sendPost(Post post)
  +sendConfig(Config config)
}

class Config {
  -numberOfScreens : int
  -dateRange : int
  -forbiddenWords : List~String~
  -whiteListAuthors : List~String~ 
  -whiteListHashtags : List~String~ 
  -allowSound : bool 
  -allowVideo : bool 
  -allowImage : bool 

  +writeConfigToFile(fileName : string) : void
  +readConfigFromFile(fileName : string)) : void
  +toString() String
}

class Post {
  -id : int 
  -content : String 
  -author : String 
  -date : Date 
  -url : String 
  +Post(String content, String author, Date date, String url, PostImage image, SocialNetwork source)
  +Post(String content, String author, Date date, String url, SocialNetwork source)
  -getUniqueID() int
  +toString() String
}

class API {
  <<abstract>>
  -base_url : String 
  -api_key : String 
  -hashTag$ : List~String~ 
  +API(String base_url)*
  +searchPostFromHashtag()* Post
  +defineHashTag(String hashtag)$
}

class PostImage {
  -url : String 
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

App "1" --o "*" Filter
App "1" --o "1" SocketServer
App "1" --o "1" API
App "1" --> "*" Post : postsFiltered
Filter "1" --> "1" Config : config
Filter <|-- BanWordsFilter 
Filter <|-- NegativeFilter

Post "*" --> "0..1" PostImage : image
Config "1" --> "0..*" SocialNetwork : socialNetworkAccepted
SocketServer "1" --> "1" Config : config
API "1" --> "1" Config : config
Post "1" --> "1" SocialNetwork : source
API <|-- TwitterAPI
API <|-- LinkedInAPI
API <|-- InstagramAPI
API <|-- FacebookAPI


```


## Frontend Clients

```mermaid
classDiagram
class App {
  -isConnected : Boolean
  -currentPost : Post
  -previousPost : Post
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
  -isConnected : Boolean
  -config : Config
  -onConnect()
  -onDisconnect()
  -onMount()
  -onUnmount()
  -onChangeConfig()
}
```

# Dynamic model : events streams, nominal and error-related, startup and shutdown



# Explaination about analysis constrains consideration


What we did that fit the constrains :

# Production frame : development, configuration and deployment tools.

## Development tools

- Git / GitHub
- CI

DEVELOPMENT RULES :
- Naming conventions : [makecode.com/extensions/naming-conventions](https://makecode.com/extensions/naming-conventions)

## Configuration tools


## Deployment tools

- Docker 
