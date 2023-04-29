
<!-- center image banner -->

<p align="center">
  <img src="doc/assets/banner.png" alt="Logo" height="200">
</p>
<p align="center">
    <b>The best way to display live social media posts for events</b>
</p>

# Features

- **Real-time**: The posts are fetched in real-time from the social media platforms
- **Supports**: Twitter
- **Filters**: Filter the posts using AI
- **Fetch by hashtag**: Fetch the posts by hashtag or basic search
- **Admin panel**: Manage the posts and the configuration of the server
- **Display anywhere**: Display the posts on any screen using a web browser

# Documentation 

- 0 - [Backlog](doc/backlog.md)
- 1 - [Analysis Report](doc/analysis-report.md)
- 2 - [Architecture Report](doc/architecture-report.md)
- 3 - [Design Report](doc/design-report.md)
- 4 - [Project Management Report](doc/management-report.md)
- 5 - [Test and Validation Report](doc/test-report.md)
- 6 - [Post Mortem](doc/post-mortem.md)

# Installation and deployment

## 1. Requirements

- Docker-compose
- Docker
- Twitter API key (if you want to use the twitter query)

To set the API key for the Twitter query, you need to create a `.env` file in the root folder of the project with the following content:

```bash
# .env
API_KEY_TWITTER="YOUR_API_KEY"
```

## 2. Start the server

start the `docker-compose.yml` file in the root of the project with:

```bash
docker-compose up
```

**Note:** The first time you start the server, it will take a while to build the images which can take up to 5 to 10 minutes depending on your internet connection. There is about **4.5GB of data to download** for the AI model.

try to access the admin panel at [localhost:3000](http://localhost:3000)
or the client at [localhost:80](http://localhost:80)

## 3. Services

When the docker-compose is up, the following services are available:

| Service      | Port | Should expose | Description                                      |
| ------------ | ---- | ------------- | ------------------------------------------------ |
| Backend      | 3001 | yes           | The main backend service (Websocket server)      |
| Front Client | 80   | yes           | The front-end used by the rasberry pi/web client |
| Front Admin  | 3000 | no            | The admin pannel front-end                       |
| Filters API  | 5000 | no            | The python filter middleware using AI            |

## 4. Deployment and ports

For deployment, you will need to expose the `3001` and the `80` ports to the internet. 
(port `3000` should be accessible only from the admin network for security reasons)

# 3. Usage and Configuration

All the configuration is done through the admin panel on the [localhost:3000](http://localhost:3000) page.

**Notes:** 
- All the data is logged in the `logs.json` file.
- The configuration is stored in the `back/src/config.json` file. 

## 3.1. Live feed

The live feed is a feature of the admin panel that allows the admin to see what is happening in the backend. It allows you to:
- Manage the **queue** of posts to be displayed
- Manage the **trashed** posts (posts that have been deleted or filtered)

## 3.2. General settings

The general settings allow you to configure the following:
- The maximum amount of posts that can be stored in the queue (and in the trash)
- The interval between each post (in seconds)


## 3.3. Query settings

Here you can select all the queries that will be used to fetch the posts. You can choose between multiple media sources:  
- Random (for debug purposes)
- Twitter

## 3.4. Filters

The filters allow you to filter the posts that are fetched from the queries. You can choose between multiple filters:

- **Sentiment**: Filter the posts based on their sentiment (positive, negative, neutral)
- **Ban words**: Filter the posts based on a list of words that you can configure
- **Images**: Filter the posts that contain images

## 3.5. Photos

You can upload photos that will be displayed on the screen randomly with the posts.

The **probability** of a photo being displayed is based on the number of posts available in the queue. The more posts there are, the less likely a photo will be displayed and vice versa.





# Contributors

- [Cody ADAM](https://github.com/CodyAdam)
- [Yanis BOUGER](https://github.com/12-3-8-s9b9o9j9t)
- [Kouame Aime Israel ANGORA](https://github.com/akai-code)
- [Louis-Gabriel CAPLIEZ](https://github.com/EdgeOfMemory-cloud) 
- Bastien FAISANT
- [Kilian CORNEC](https://github.com/Kali-ki)
