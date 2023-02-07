import { WithId, Post, SocialNetwork, postWithId } from '../post';
import { Api } from './api';
import * as https from 'https';

export class ApiTwitter extends Api {
  constructor() {
    super(SocialNetwork.TWITTER);
  }

  public async fetchPosts() {
    // Hashtags
    // let hashtags: string[] = this.config.whitelistHashtags;
    let hashtags: string[] = ['figaro', 'rennes'];

    // Result
    let result: WithId<Post>[] = [];

    // Base url
    let url: string = 'https://api.twitter.com/2/tweets/search/recent?query=';

    // Max results
    let max_results: number = 10;

    // Langue of search
    let lang: string = 'fr';

    // Hashtag search
    let search: string = '(';
    for (let i = 0; i < hashtags.length - 1; i++) {
      search += '#' + hashtags[i] + ' OR ';
    }
    search += '#' + hashtags[hashtags.length - 1] + ')';

    // Exclude retweets and replies
    search += ' -is:retweet -is:reply';

    // Build search part
    search = search + ' lang:' + lang;

    // Build url
    url =
      url +
      encodeURIComponent(search) +
      '&max_results=' +
      max_results + // Max results
      '&expansions=author_id' + // Expansions -> referenced tweets, author id
      '&tweet.fields=created_at' + // Tweet fields -> creation date
      '&user.fields=name,username,profile_image_url'; // User fields -> name, username, profile image

    // Bearer token
    let BearerToken =
      'AAAAAAAAAAAAAAAAAAAAAJEylgEAAAAAxkdNxil3XDR%2FtKLvaBb71e%2FA7q8%3Du2crw3ChPNn3SiIG4ZCVgXnaqfSW58vNtQYdmGsJD6hBhBtyG2';

    // Import https -> https://nodejs.org/api/https.html

    // Set the headers
    const options = {
      headers: {
        Authorization: 'Bearer ' + BearerToken,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    // Get the tweets
    let tweet = data.data;

    // Get the users
    let user = data.includes.users;

    for (let i = 0; i < tweet.length; i++) {
      let id_tweet = tweet[i]['id']; // Get the id
      let text = tweet[i]['text']; // Get the text
      let id_author = tweet[i]['author_id']; // Get the author id
      let date = tweet[i]['created_at']; // Get the date
      let username = '';
      let name = '';
      let image_url = '';

      for (let i = 0; i < user.length; i++) {
        if (user[i]['id'] == id_author) {
          name = user[i]['name'];
          username = user[i]['username'];
          image_url = user[i]['profile_image_url'];

          console.log('name : ' + name);
          console.log('username : ' + username);
          console.log('image_url : ' + image_url);

          break;
        }
      }

      console.log('id_tweet : ' + id_tweet);
      console.log('text : ' + text);
      console.log('id_author : ' + id_author);
      console.log('date : ' + date);
      console.log('username : ' + username);
      console.log('name : ' + name);
      console.log('image_url : ' + image_url);
      console.log('url tweet : ' + 'https://twitter.com/' + username + '/status/' + id_tweet);
      console.log('\n\n');

      // Push the post on the result array
      result.push(
        postWithId({
          content: { text: text },
          author: { name: name, username: username, image: image_url },
          date: new Date(date),
          originUrl: 'https://twitter.com/' + username + '/status/' + id_tweet,
          socialNetwork: this.socialNetwork,
        }),
      );
    }

    return result;
  }
}
