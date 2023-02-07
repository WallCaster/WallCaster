import { Api } from './api/api';
import { ApiRandom } from './api/api-random';
import { ApiTwitter } from './api/api-twitter';
import configManager from './config';
import { ApiType, Post } from './post';
import { SocketServer } from './socket-server';

export class App {
  /**
   * the cache of posts
   * first in first out
   */
  private posts: Post[] = [];
  private socketServer: SocketServer = new SocketServer();
  private apis: Partial<Record<ApiType, Api>> = { twitter: new ApiTwitter(), random: new ApiRandom() };

  public run() {
    const posts = new ApiRandom().fetchPosts();

    // call in 3 sec again
    this.send();
    setTimeout(() => this.run(), 3000);
  }

  private send() {
    new ApiTwitter().fetchPosts().then((posts) => {
      if (posts != null) {
        console.log('Sending post to all clients... clients:' + this.socketServer.getNumberOfClients());
        // randomly pick a post in the posts array
        const post = posts[Math.floor(Math.random() * posts.length)];
        this.socketServer.sendPostToAll(post);
      }
    });
  }

  /**
   * Adds a new post to the cache but in the front to prioritize it
   */
  public addPost(post: Post) {
    this.posts.unshift(post);
  }

  /**
   * Get the next post to send to the client
   * It is the first post in the cache
   * then add it back to the end of the cache
   */
  public getNextPost(): Post | null {
    if (this.posts.length > 0) {
      const post = this.posts[0];
      this.posts.splice(0, 1);
      this.posts.push(post);
      return post;
    }
    return null;
  }

  public removePost(id: string) {
    this.posts = this.posts.filter((post) => post.id !== id);
  }

  public filterPost(post: Post) {

    const message = {
      post: post,
      filter_config: configManager.config.filter
    }
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
      .catch((error) => console.error(error));
  }
}
