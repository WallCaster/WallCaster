import configManager from '../config';
import { ApiName, Author, Post } from '../post';
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
    let lang: string = 'fr';
    let search: string = '(';
    for (let i = 0; i < hashtags.length - 1; i++) {
      search += '#' + hashtags[i] + ' OR ';
    }
    search += '#' + hashtags[hashtags.length - 1] + ')';

    // Exclude retweets and replies
    search += ' -is:retweet -is:reply';
    search += ' lang:' + lang;

    // Build url
    fetchUrl +=
      encodeURIComponent(search) +
      '&max_results=' +
      max_results + // Max results
      '&expansions=author_id' + // Expansions -> referenced tweets, author id
      '&tweet.fields=created_at' + // Tweet fields -> creation date
      '&user.fields=name,username,profile_image_url'; // User fields -> name, username, profile image

    // Bearer token
    let BearerToken =
      'AAAAAAAAAAAAAAAAAAAAAJEylgEAAAAAxkdNxil3XDR%2FtKLvaBb71e%2FA7q8%3Du2crw3ChPNn3SiIG4ZCVgXnaqfSW58vNtQYdmGsJD6hBhBtyG2';
    // Set the headers
    const options = {
      headers: {
        Authorization: 'Bearer ' + BearerToken,
      },
    };
    const response = await fetch(fetchUrl, options);
    const json = await response.json();
    let tweets = json.data;
    let user = json.includes.users;

    for (let i = 0; i < tweets.length; i++) {
      const tweet = tweets[i];
      const author_id = tweet.author_id;
      const author = user.find((user: any) => user.id === author_id);
      const post: Post = {
        id: tweet.id,
        author: {
          name: author.name,
          username: author.username,
          image: author.profile_image_url,
        },
        content: { text: tweet.text },
        date: new Date(tweet.created_at),
        originUrl: `https://twitter.com/${author.username}/status/${tweet.id}`,
        api: ApiName.TWITTER,
      };

      // Push the post on the result array
      result.push(post);
    }

    return result;
  }
}
