import configManager from '../config';
import { ApiName, Post } from '../post';
import { Api } from './api';

export class ApiTwitter extends Api {

  private readonly ERROR_MESSAGE_BASE: string = "Twitter API error : ";

  constructor() {
    super(ApiName.TWITTER);
  }

  public async fetchPosts() {

    // Get the hashtags from the config
    let hashtags: string[] = configManager.config.query.twitter.whitelistHashtags;

    let result: Post[] = [];

    // URL of the endpoint for the research
    let fetchUrl: string = 'https://api.twitter.com/2/tweets/search/recent?query=';

    // Get the max results from the config
    let max_results: number = configManager.config.query.twitter.fetchQuantity;

    let search: string = '(';

    // Add hashtags to the research
    for (let i = 0; i < hashtags.length - 1; i++) {
      search += '#' + hashtags[i] + ' OR ';
    }
    search += '#' + hashtags[hashtags.length - 1] + ')';

    // Exclude retweets and replies
    search += ' -is:retweet -is:reply';

    // Build url
    fetchUrl +=
      encodeURIComponent(search) +

      '&max_results=' + max_results + // Max results
      
      '&end_time=' + "2023-03-14T13:00:00Z" + // End time
      '&start_time=' + "2023-03-10T13:00:00Z" + // Start time

      '&expansions=author_id,attachments.media_keys' + // Expansions -> referenced tweets, author id
      '&tweet.fields=created_at,attachments' + // Tweet fields -> creation date, media attached
      '&user.fields=name,username,profile_image_url' + // User fields -> name, username, profile image
      '&media.fields=url,preview_image_url' ; // Media fields -> url, preview_image_url

    // Bearer token
    let BearerToken =
      'AAAAAAAAAAAAAAAAAAAAAJEylgEAAAAAxkdNxil3XDR%2FtKLvaBb71e%2FA7q8%3Du2crw3ChPNn3SiIG4ZCVgXnaqfSW58vNtQYdmGsJD6hBhBtyG2';
    
      // Set the headers
    const options = {
      headers: {
        Authorization: 'Bearer ' + BearerToken // Add the authorization token (BearerToken)
      },
    };

    try {      
      const response = await fetch(fetchUrl, options);
      const json = await response.json();

      // If the response is not ok, throw an error
      if (!response.ok) {
        throw new Error(this.ERROR_MESSAGE_BASE + "Response Not OK\n" + JSON.stringify(json, null, 2));
      }

      // If there is no data in the response, throw an error
      if(json.data === undefined){
        throw new Error(this.ERROR_MESSAGE_BASE + "No field data in tweet search")
      }
      let tweets = json.data;

      // If there is no includes in the response, throw an error
      if(json.includes === undefined){
        throw new Error(this.ERROR_MESSAGE_BASE + "No includes data in tweet search")
      }

      // If there is no users in the includes, throw an error
      if(json.includes.users === undefined){
        throw new Error(this.ERROR_MESSAGE_BASE + "No includes data in tweet search")
      }
      let user = json.includes.users;
      
      // If there is no media in the includes, set a false presence of media
      let hasMedia : boolean = true;
      let medias;
      if(json.includes.media === undefined){
        hasMedia = false;
      }else{
        medias = json.includes.media
      }

      // This big loop allow to search for the media attached to the tweets
      for (let i = 0; i < tweets.length; i++) {
        const tweet = tweets[i];

        let image_urls = []; // List of url. Stay empty if there is no media.

        // Looks if there is media attached to the tweet
        // If yes, get the media keys
        // If not, put at false the presence of media
        let attachments = tweet.attachments;
        let keys;
        let hasMediaOnTweet : boolean = false;
        if(attachments !== undefined){
          keys = attachments.media_keys;
          if(attachments.media_keys !== undefined){
            hasMediaOnTweet = true;
          }
        }

        // If there is media on the tweet but no media are given by the API, throw an error
        if(hasMediaOnTweet && !hasMedia){
          // console.info(json);
          // console.log("hasMediaOnTweet : " + hasMediaOnTweet);
          // console.log("hasMedia : " + hasMedia);
          // console.log("attachments.media_keys : " + attachments.media_keys);
          // console.log("tweet : " + tweet.id);
          throw new Error(this.ERROR_MESSAGE_BASE + "Tweet contains media but no media are given by API");
        }

        if(hasMedia){ // If there is media
          if(hasMediaOnTweet){ // If there is attachments

            for(let k = 0 ; k < keys.length ; k++){
              for(let l = 0 ; l < medias.length ; l++){
                // If there are photos or videos
                if(medias[l].type === "photo" || medias[l].type === "video"){
                  if(medias[l].media_key === keys[k]){
                    if(medias[l].type === "photo"){ // If there is a photo, add the url
                      image_urls.push(medias[l].url)
                    }else{ // If there is a video, add the preview image url
                      image_urls.push(medias[l].preview_image_url)
                    }
                  }
                }
              }
            }

          }
        }
        
        // Get the author of the tweet
        const author_id = tweet.author_id;

        // Find the author in the user list
        const author = user.find((user: any) => user.id === author_id);

        // Create the post
        const post: Post = {
          id: tweet.id,
          author: {
            name: author.name,
            username: author.username,
            image: author.profile_image_url,
          },
          // Delete the last 24 characters of the tweet text (the link to the tweet)
          content: { text: tweet.text.substring(0, tweet.text.length - 24), images: image_urls},
          date: new Date(tweet.created_at),
          originUrl: `https://twitter.com/${author.username}/status/${tweet.id}`,
          api: ApiName.TWITTER,
        };

        // Push the post on the result array
        result.push(post);
        console.log(post);
      }
    } catch (error) {
      const red = '\x1b[31m';
      const reset = '\x1b[0m';
      console.error(red + 'Error while fetching tweets: ')
      console.error(error)
      console.error(reset)
    }
    return result;
  }

  protected getInterval(): number {
    return configManager.config.query.twitter.fetchInterval;
  }
}
