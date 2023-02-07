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

  public run() {
    const posts = new ApiRandom().fetchPosts();
    // this.filterPost(posts);

    // call in 3 sec again
    this.send();
    setTimeout(() => this.run(), 3000);
  }

  private send() {
    new ApiTwitter().fetchPosts().then((posts) => {
      if (posts != null) {
        console.log('Sending post to all clients... clients:' + this.socketServer.getNumberOfClients());
        // for (const post of posts) {
        //   this.socketServer.sendPostToAll(post);
        // }
        // randomly pick a post in the posts array
        const post = posts[Math.floor(Math.random() * posts.length)];
        this.socketServer.sendPostToAll(post);
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

  public filterPost(post: WithId<Post>) {
    const myUrl = 'http://filter-processor:5000/filter';
    fetch(myUrl, {
      method: 'POST',
      body: JSON.stringify(post),
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error(error));
  }
}
