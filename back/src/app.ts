import { Api } from './api';
import { ApiTwitter } from './api-twitter';
import { Config } from './config';
import { Filter } from './filter';
import { Post } from './post';
import { SocketServer } from './socket-server';

export class App {
  private cache: Array<Post>;
  private apis: Array<Api>;
  private postsFiltered: Array<Post>;
  private socketServer: SocketServer;
  private filter: Filter;
  private config: Config;

  constructor() {
    console.log('Starting server...');
    this.cache = new Array<Post>();
    this.apis = new Array<Api>();
    this.postsFiltered = new Array<Post>();
    this.config = new Config();
    this.filter = new Filter();
    this.socketServer = new SocketServer(this.config);
    this.run();
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
    setTimeout(() => this.run(), 1000);
  }

  private send() {
    const postsToSend = new ApiTwitter(this.config).searchPostFromHashTag();
    if (postsToSend != null) {
      console.log('Sending post to all clients...');
      this.socketServer.sendPostToAll(postsToSend);
    }
  }
}
