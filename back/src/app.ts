import { Api, ApiRandom } from './api';
import { ApiTwitter } from './api/api-twitter';
import { Filter } from './filter';
import { Post, WithId } from './post';
import { SocketServer } from './socket-server';

export class App {
  /**
   * the cache of posts
   * first in first out
   */
  private posts: Array<WithId<Post>> = new Array<WithId<Post>>();
  private socketServer: SocketServer = new SocketServer();
  private apis: Array<Api> = [new ApiRandom()];
  private filters: Array<Filter> = [];

  public run() {
    // call in 3 sec again
    this.send();
    setTimeout(() => this.run(), 3000);
  }

  private send() {
    new ApiTwitter().fetchPosts().then((posts) => {
      if (posts != null) {
        console.log('Sending post to all clients... clients:' + this.socketServer.getNumberOfClients());
        for (const post of posts) {
          this.socketServer.sendPostToAll(post);
        }
      }
    });
  }

  /**
   * Adds a new post to the cache but in the front to prioritize it
   */
  public addPost(post: WithId<Post>) {
    this.posts.unshift(post);
  }

  /**
   * Get the next post to send to the client
   * It is the first post in the cache
   * then add it back to the end of the cache
   */
  public getNextPost(): WithId<Post> | null {
    if (this.posts.length > 0) {
      const post = this.posts[0];
      this.posts.splice(0, 1);
      this.posts.push(post);
      return post;
    }
    return null;
  }

  public removePost(id: number) {
    if (id > -1 && id < this.apis.length) {
      this.apis.splice(id, 1);
    }
  }
}
