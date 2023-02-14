import { App } from '../app';
import { ApiType, Post } from '../post';

export abstract class Api {
  protected apiName: ApiType;
  protected running: boolean = false;

  constructor(apiName: ApiType) {
    this.apiName = apiName;
  }

  public abstract fetchPosts(): Promise<Post[]>;

  protected abstract getInterval(): number;

  public start(app: App): void {
    this.running = true;
    setInterval(() => {
      if (this.running) {
        this.fetchPosts().then((posts) => {
          app.addPosts(posts);
        });
      }
    }, this.getInterval() * 1000);
  }

  public stop() {
    this.running = false;
  }
}
