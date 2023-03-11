import { Api } from './api/api';
import { ApiRandom } from './api/api-random';
import { ApiTwitter } from './api/api-twitter';
import configManager from './config';
import { filterPost } from './filtering';
import { ApiType, FilterData, Post } from './post';
import { SocketServer } from './socket-server';
import { writeFileSync } from 'fs';
import { join } from 'path';

export class App {
  // the set of all posts ids (filtered and unfiltered)
  private posts_ids: Set<string> = new Set();
  // the list of incoming posts from the api (first stage)
  private posts: (Post & FilterData)[] = [];
  private postsRefused: (Post & FilterData)[] = [];
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
  public addPosts(posts: Post[]) {
    posts.forEach(async (post) => {
      if (!this.posts_ids.has(post.id)) {
        this.posts_ids.add(post.id);
        const filterData: FilterData = await filterPost(post);

        this.writeInLogsFile('logs.json', { ...post, ...filterData });

        if(filterData.passedBanwords === false || filterData.passedImages === false || filterData.passedSentiment === false){
          this.postsRefused.push({ ...post, ...filterData });
        }else{
          this.posts.unshift({ ...post, ...filterData });
        }

        this.clampCache();
        this.socket.sendCacheToAdmin();
      }
    });
  }

  public getCache(): (Post & FilterData)[] {
    return this.posts;
  }

  public getCacheRefused(): (Post & FilterData)[] {
    return this.postsRefused;
  }

  public writeInLogsFile(filename: string, logs: any) {
    writeFileSync(join(filename), JSON.stringify(logs), {
      flag: 'a+',
    });
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
      this.clampCache();
      this.socket.sendCacheToAdmin();
      return post;
    }
    return null;
  }

  private clampCache() {
    const max = configManager.config.maxStoreSize;
    if (this.posts.length > max) {
      this.posts.splice(max, this.posts.length - max);
    }
    if (this.postsRefused.length > max) {
      this.postsRefused.splice(max, this.postsRefused.length - max);
    }
  }

  public removePost(id: string) {
    // this.posts_ids.delete(id);
    this.posts = this.posts.filter((post) => post.id !== id);
    this.socket.sendCacheToAdmin();
  }
}
