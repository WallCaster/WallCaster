import { Api } from './api/api';
import { ApiRandom } from './api/api-random';
import { ApiTwitter } from './api/api-twitter';
import configManager from './config';
import { ApiType, Post } from './post';
import { SocketServer } from './socket-server';

export class App {
  // the set of all posts ids (filtered and unfiltered)
  private posts_ids: Set<string> = new Set();
  // the list of incoming posts from the api (first stage)
  private posts_unfiltered: Post[] = [];
  private socket: SocketServer;
  private apis: Partial<Record<ApiType, Api>>;
  private rotationInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.socket = new SocketServer(this);
    this.apis = { twitter: new ApiTwitter(), random: new ApiRandom() };
    this.restart();
  }

  // Automatically restart the server when the config file is modified
  public restart() {
    const query = configManager.config.query;
    if (query.useTwitterApi && this.apis.twitter) this.apis.twitter.start(this);
    else if (this.apis.twitter) this.apis.twitter.stop();
    if (query.useRandomApi && this.apis.random) this.apis.random.start(this);
    else if (this.apis.random) this.apis.random.stop();

    if (this.rotationInterval) clearInterval(this.rotationInterval);
    this.rotationInterval = setInterval(() => {
      for (let room of this.socket.getRoomsIds()) {
        const post = this.getNextPost();
        if (post) this.socket.sendPostToRoom(room, post);
      }
    }, configManager.config.rotationInterval * 1000);
  }

  /**
   * Adds a new post to the cache but in the front to prioritize it
   */
  public addPost(post: Post) {
    if (!this.posts_ids.has(post.id)) {
      this.posts_ids.add(post.id);
      // Filter here
      // this.filterPost(post);
      this.posts_unfiltered.unshift(post);
      this.socket.sendPostToAll(post);
    }
  }

  /**
   * Adds a new post to the cache but in the front to prioritize it
   */
  public addPosts(posts: Post[]) {
    posts.forEach((post) => {
      this.addPost(post);
    });
  }

  /**
   * Get the next post to send to the client
   * It is the first post in the cache
   * then add it back to the end of the cache
   */
  public getNextPost(): Post | null {
    if (this.posts_unfiltered.length > 0) {
      const post = this.posts_unfiltered[0];
      this.posts_unfiltered.splice(0, 1);
      this.posts_unfiltered.push(post);
      return post;
    }
    return null;
  }

  public removePost(id: string) {
    this.posts_ids.delete(id);
    this.posts_unfiltered = this.posts_unfiltered.filter((post) => post.id !== id);
  }

  public filterPost(post: Post) {
    const message = {
      post: post,
      filter_config: configManager.config.filter,
    };
    const myUrl = 'http://filter-processor:5000/filter';
    fetch(myUrl, {
      method: 'POST',
      body: JSON.stringify(message),
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error('Error during filter :', error));
  }
}
