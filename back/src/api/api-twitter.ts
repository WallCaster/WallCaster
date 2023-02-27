import configManager from '../config';
import { ApiName, Post } from '../post';
import { Api } from './api';

export class ApiTwitter extends Api {
  constructor() {
    super(ApiName.TWITTER);
  }

  public async fetchPosts() {
    let hashtags: string[] = configManager.config.query.twitter.whitelistHashtags;
    let result: Post[] = [];
    let fetchUrl: string = 'https://api.twitter.com/2/tweets/search/recent?query=';
    let max_results: number = configManager.config.query.twitter.fetchQuantity;
    let search: string = '(';
    for (let i = 0; i < hashtags.length - 1; i++) {
      search += '#' + hashtags[i] + ' OR ';
    }
    search += '#' + hashtags[hashtags.length - 1] + ')';

    // Exclude retweets and replies
    search += ' -is:retweet -is:reply';

    // Build url
    fetchUrl +=
      encodeURIComponent(search) +
      '&max_results=' +
      max_results + // Max results
      '&expansions=author_id,attachments.media_keys' + // Expansions -> referenced tweets, author id
      '&tweet.fields=created_at,attachments' + // Tweet fields -> creation date, media attached
      '&user.fields=name,username,profile_image_url' + // User fields -> name, username, profile image
      '&media.fields=url' ;
    // Bearer token
    let BearerToken =
      'AAAAAAAAAAAAAAAAAAAAAJEylgEAAAAAxkdNxil3XDR%2FtKLvaBb71e%2FA7q8%3Du2crw3ChPNn3SiIG4ZCVgXnaqfSW58vNtQYdmGsJD6hBhBtyG2';
    // Set the headers
    const options = {
      headers: {
        Authorization: 'Bearer ' + BearerToken,
      },
    };

    try {      
      const response = await fetch(fetchUrl, options);
      const json = await response.json();

      if (!response.ok) {
        throw new Error(JSON.stringify(json, null, 2));
      }

      let tweets = json.data;
      let user = json.includes.users;
      
      let hasMedia : boolean = false;
      let medias = []; // List of media that will be keep (only photos)
      let medias_ = json.includes.media; // All the media (videos and photos)

      if(medias_ != undefined){
        hasMedia = true; // Set a true presence of media
        for(let i = 0 ; i < medias_.length ; i++){
          const media = medias_[i];
          if(media.type === "photo"){ // If the medium is a photo then keep it in the final list
            medias.push(media);
          }
        }
      }

      for (let i = 0; i < tweets.length; i++) {
        const tweet = tweets[i];

        let image_urls = []; // List of url. Stay empty if there is no media.

        if(hasMedia){
          let keys;
          let attachments = tweet.attachments;
          if(attachments != undefined){
            keys = attachments.media_keys
            for(let k = 0 ; k < keys.length ; k++){
              for(let l = 0 ; l < medias.length ; l++){
                if(medias[l].media_key === keys[k]){
                  image_urls.push(medias[l].url)
                }
              }
              
            }
          }
        }

        const author_id = tweet.author_id;
        const author = user.find((user: any) => user.id === author_id);
        const post: Post = {
          id: tweet.id,
          author: {
            name: author.name,
            username: author.username,
            image: author.profile_image_url,
          },
          content: { text: tweet.text, images: image_urls},
          date: new Date(tweet.created_at),
          originUrl: `https://twitter.com/${author.username}/status/${tweet.id}`,
          api: ApiName.TWITTER,
        };

        // Push the post on the result array
        result.push(post);
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
