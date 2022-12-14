import { Api, ApiRandom } from './api';
import { Config, defaultConfig } from './config';
import { Filter } from './filter';
import { Post, WithId } from './post';
import { SocketServer } from './socket-server';

export class App {
  private config: Config;
  private posts: Array<WithId<Post>>;
  private apis: Array<Api>;
  private socketServer: SocketServer;
  private filters: Array<Filter>;

  constructor() {
    this.posts = new Array<WithId<Post>>();
    this.apis = new Array<Api>();
    this.config = defaultConfig;
    this.filters = new Array<Filter>();
    this.socketServer = new SocketServer(this.config);
  }

  public run() {
    // call in 3 sec again
    this.send();
    setTimeout(() => this.run(), 1000);
  }

  private send() {
    const postsToSend = new ApiRandom(this.config).fetchPost();
    if (postsToSend != null) {
      console.log('Sending post to all clients... clients:' + this.socketServer.getNumberOfClients());
      this.socketServer.sendPostToAll(postsToSend);
    }
  }

  public addAPI(api: Api) {
    if (!this.apis.includes(api)) {
      this.apis.push(api);
    }
  }

  public removeAPI(api: Api) {
    const index: number = this.apis.indexOf(api);
    if (index > -1) {
      this.apis.splice(index, 1);
    }
  }

  public addPost(post: WithId<Post>) {
    if (!this.posts.includes(post)) {
      this.posts.push(post);
    }
  }

  public removePost(id: number) {
    if (id > -1 && id < this.apis.length) {
      this.apis.splice(id, 1);
    }
  }
}
