import { App } from '../app';
import { ApiType, Post } from '../post';

export abstract class Api {
  protected apiName: ApiType;
  protected running: boolean = false;
  private interval : NodeJS.Timer | null = null;

  constructor(apiName: ApiType) {
    this.apiName = apiName;
  }

  public abstract fetchPosts(): Promise<Post[]>;

  protected abstract getInterval(): number;

  public start(app: App): void {
    this.running = true;
    if (this.interval) clearInterval(this.interval);
    this.interval = setInterval(() => {
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
