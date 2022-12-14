import { Api, ApiRandom } from './api';
import { Config, defaultConfig } from './config';
import { Filter } from './filter';
import { Post } from './post';
import { SocketServer } from './socket-server';

export class App {
  private config: Config;
  private cache: Array<Post>;
  private apis: Array<Api>;
  private socketServer: SocketServer;
  private filters: Array<Filter>;

  constructor() {
    this.cache = new Array<Post>();
    this.apis = new Array<Api>();
    this.config = defaultConfig;
    this.filters = new Array<Filter>();
    this.socketServer = new SocketServer(this.config);
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

  public addPost(post: Post) {
    if (!this.cache.includes(post)) {
      this.cache.push(post);
    }
  }

  public removePost(id: number) {
    if (id > -1 && id < this.apis.length) {
      this.apis.splice(id, 1);
    }
  }

  public run() {
    // call in 3 sec again
    this.send();
    setTimeout(() => this.run(), 3000);
  }

  private send() {
    const postsToSend = new ApiRandom(this.config).fetchPost();
    if (postsToSend != null) {
      console.log('Sending post to all clients... clients:' + this.socketServer.getNumberOfClients());
      this.socketServer.sendPostToAll(postsToSend);
    }
  }
}
