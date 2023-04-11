import configManager from '../config';
import { ApiName, Post } from '../post';
import { Api } from './api';

const API_KEY_TWITTER = process.env.API_KEY_TWITTER;

export class ApiTwitter extends Api {
  private readonly ERROR_MESSAGE_BASE: string = 'Twitter API error : ';
  private readonly WARNING_MESSAGE_BASE: string = 'Twitter API warning : ';

  constructor() {
    super(ApiName.TWITTER);
  }

  public async fetchPosts() {
    // Array of posts ; will be returned
    let result: Post[] = [];

    // Get the hashtags from the config
    let hashtags: string[] = configManager.config.query.twitter.whitelistHashtags;

    // Get keywords from the config
    let keywords: string[] = configManager.config.query.twitter.keywords;

    // Get the languages from the config
    let langs: string[] = configManager.config.query.twitter.languages;

    // URL of the endpoint for the research
    let fetchUrl: string = 'https://api.twitter.com/2/tweets/search/recent?query=';

    // Get the max results from the config
    let max_results: number = configManager.config.query.twitter.fetchQuantity;

    // Get start fetch date and end fetch date
    let d_start: Date = new Date(
      new Date().getTime() - configManager.config.query.twitter.maxDateRange * 24 * 60 * 60 * 1000,
    );
    let d_end: Date = new Date(new Date().getTime() - 10 * 1000);

    // If the start date is after the end date
    // if(d_start > d_end){
    //   console.warn(this.WARNING_MESSAGE_BASE + "Start date is after end date. Start date is changed to actual days - 7 days.")
    //   d_start = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
    // }

    // If the start date is after the current date
    if (d_start > new Date()) {
      console.warn(
        this.WARNING_MESSAGE_BASE +
          'Start date is after the current date. Start date is changed to actual days - 7 days.',
      );
      d_start = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    // If the end date is after the current date
    // if (d_end > new Date(new Date().getTime() - 10 * 1000)) {
    // console.warn(this.WARNING_MESSAGE_BASE + "End date is after the current date. End date is changed to actual date.");
    //   d_end = new Date(new Date().getTime() - 10 * 1000);
    // }

    // If the start date is more than 7 days before the current date, change start Data at actual days - 7 days
    if (d_start < new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)) {
      console.warn(
        this.WARNING_MESSAGE_BASE +
          'Start date is more than 7 days before the current date. Start date is changed to actual days - 7 days.',
      );
      d_start = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    // Initialize the search string
    let search: string = '';

    // If there is no keywords and no hashtags, return an empty array
    if (keywords.length === 0 && hashtags.length === 0) {
      return [];
    }

    hashtags = hashtags.filter((hashtag) => {
      // check empty string
      if (hashtag === '') {
        return false;
      }
      return true;
    });

    // Add hashtags to the research
    if (hashtags.length !== 0) {
      search = '(';
      for (let i = 0; i < hashtags.length; i++) {
        search += '#' + hashtags[i];
        if (i < hashtags.length - 1) {
          search += ' OR ';
        }
      }
      search += ')';
    }

    keywords = keywords.filter((keyword) => {
      // check empty string
      if (keyword === '') {
        return false;
      }
      return true;
    });

    // Add keywords to the research
    if (keywords.length !== 0) {
      search += ' (';
      for (let i = 0; i < keywords.length; i++) {
        search += '"' + keywords[i] + '"';
        if (i < keywords.length - 1) {
          search += ' OR ';
        }
      }
      search += ')';
    }

    // Exclude retweets, replies & quotes tweets
    search += ' -is:retweet -is:reply -is:quote ';

    // Languages accepted
    let langs_str: string = '';
    if (langs.length > 0) {
      langs_str += '(';
      for (let i = 0; i < langs.length; i++) {
        langs_str += 'lang:' + langs[i];
        if (i < langs.length - 1) {
          langs_str += ' OR ';
        }
      }
      langs_str += ')';
    }

    // Add languages to the research
    search += langs_str;

    // Build url
    fetchUrl +=
      encodeURIComponent(search) +
      '&max_results=' +
      max_results + // Max results
      '&end_time=' +
      d_end.toISOString() + // End time => Can be restore if needed
      '&start_time=' +
      d_start.toISOString() + // Start time
      '&expansions=author_id,attachments.media_keys' + // Expansions -> referenced tweets, author id
      '&tweet.fields=created_at,attachments' + // Tweet fields -> creation date, media attached
      '&user.fields=name,username,profile_image_url' + // User fields -> name, username, profile image
      '&media.fields=url,preview_image_url'; // Media fields -> url, preview_image_url

    // Bearer token
    let BearerToken = API_KEY_TWITTER;
  

    // Set the headers
    const options = {
      headers: {
        Authorization: 'Bearer ' + BearerToken, // Add the authorization token (BearerToken)
      },
    };

    try {
      const response = await fetch(fetchUrl, options);
      const json = await response.json();

      // If the response is not ok, throw an error
      if (!response.ok) {
        console.error(this.ERROR_MESSAGE_BASE + 'Response Not OK\n' + JSON.stringify(json, null, 2));
        return [];
      }

      // If there is no data in the response, return an empty array
      // When there is no data, it means that there is no tweet with the given hashtags
      if (json.data === undefined) {
        console.warn(this.WARNING_MESSAGE_BASE + 'No data in tweet search');
        return [];
      }
      let tweets = json.data;

      // If there is no includes in the response
      if (json.includes === undefined) {
        console.error(this.ERROR_MESSAGE_BASE + 'No includes data in tweet search');
        return [];
      }

      // If there is no users in the includes
      if (json.includes.users === undefined) {
        console.error(this.ERROR_MESSAGE_BASE + 'No includes users data in tweet search');
        return [];
      }
      let user = json.includes.users;

      // If there is no media in the includes, set a false presence of media
      let hasMedia: boolean = true;
      let medias;
      if (json.includes.media === undefined) {
        hasMedia = false;
      } else {
        medias = json.includes.media;
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
        let hasMediaOnTweet: boolean = false;
        if (attachments !== undefined) {
          keys = attachments.media_keys;
          if (attachments.media_keys !== undefined) {
            hasMediaOnTweet = true;
          }
        }

        // If there is media on the tweet but no media are given by the API, throw an error
        if (hasMediaOnTweet && !hasMedia) {
          // console.info(json);
          // console.log("hasMediaOnTweet : " + hasMediaOnTweet);
          // console.log("hasMedia : " + hasMedia);
          // console.log("attachments.media_keys : " + attachments.media_keys);
          // console.log("tweet : " + tweet.id);
          console.error(this.ERROR_MESSAGE_BASE + 'Tweet contains media but no media are given by API');
          return [];
        }

        if (hasMedia) {
          // If there is media
          if (hasMediaOnTweet) {
            // If there is attachments

            for (let k = 0; k < keys.length; k++) {
              for (let l = 0; l < medias.length; l++) {
                // If there are photos or videos
                if (medias[l].type === 'photo' || medias[l].type === 'video') {
                  if (medias[l].media_key === keys[k]) {
                    if (medias[l].type === 'photo') {
                      // If there is a photo, add the url
                      image_urls.push(medias[l].url);
                    } else {
                      // If there is a video, add the preview image url
                      image_urls.push(medias[l].preview_image_url);
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
          content: { text: tweet.text, images: image_urls },
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
      console.error(red + 'Error while fetching tweets: ');
      console.error(error);
      console.error(reset);
    }
    return result;
  }

  protected getInterval(): number {
    return configManager.config.query.twitter.fetchInterval;
  }
}
