import { Api } from './api/api';
import { ApiRandom } from './api/api-random';
import { ApiTwitter } from './api/api-twitter';
import configManager from './config';
import { filterPost } from './filtering';
import { ApiType, FilterData, Post } from './post';
import { SocketServer } from './socket-server';
import { writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

export class App {
  // the set of all posts ids (filtered and unfiltered)
  private posts_ids: Set<string> = new Set();
  // the list of incoming posts from the api (first stage)
  private cache: (Post & FilterData)[] = [];
  private trash: (Post & FilterData)[] = [];
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
    this.clampCache();
    this.clampTrash();
    if (query.useTwitterApi && this.apis.twitter) this.apis.twitter.start(this);
    else if (this.apis.twitter) this.apis.twitter.stop();
    if (query.useRandomApi && this.apis.random) this.apis.random.start(this);
    else if (this.apis.random) this.apis.random.stop();

    if (this.rotationInterval) clearInterval(this.rotationInterval);
    this.rotationInterval = setInterval(() => {
      for (let room of this.socket.getRoomsIds()) {

        const files = readdirSync("assets")

        // Calcul the ratio between the cache and the images to define the probability to send a post or an image
        const random = Math.random();
        let p : number = Number(this.cache.length / (this.cache.length + files.length));

        if(random < p) {
          const post = this.getNextPost();
          if (post) this.socket.sendPostToRoom(room, post);
        }
        else {

          if(files.length > 0) {
            const chosenFile = files[Math.floor(Math.random() * files.length)] 
  
            const path = "assets/" + chosenFile;
            this.socket.sendImageToRoom(room, path)
          }
        }
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

        let filterData: FilterData
        try {
          filterData = await filterPost(post);
        }catch(e) {
          console.log(e)
          return;
        }
        

        // Write logs in a log.json file
        this.writeInLogsFile('logs.json', { ...post, ...filterData });

        if (
          filterData.passedBanwords === false ||
          filterData.passedImages === false ||
          filterData.passedSentiment === false ||
          filterData.passedNsfw === false
        ) {
          this.trash.unshift({ ...post, ...filterData });
        } else {
          this.cache.unshift({ ...post, ...filterData });
        }

        this.clampCache();
        this.clampTrash();
        this.socket.sendCacheToAdmin();
      }
    });
  }

  public getCache(): (Post & FilterData)[] {
    return this.cache;
  }

  public getTrash(): (Post & FilterData)[] {
    return this.trash;
  }

  // Method to write logs in a file
  public writeInLogsFile(filename: string, logs: any) {
    writeFileSync(join(filename), JSON.stringify(logs)+"\n", {
      flag: 'a+'
    });
  }

  /**
   * Get the next post to send to the client
   * It is the first post in the cache
   * then add it back to the end of the cache
   */
  public getNextPost(): Post | null {
    if (this.cache.length > 0) {
      const post = this.cache[0];
      this.cache.splice(0, 1);
      this.cache.push(post);
      this.clampCache();
      this.clampTrash();
      this.socket.sendCacheToAdmin();
      return post;
    }
    return null;
  }

  private clampCache() {
    const max = configManager.config.maxStoreSize;
    if (this.cache.length > max) {
      this.cache.splice(max, this.cache.length - max);
    }
  }

  public clampTrash() {
    const max = configManager.config.maxStoreSize;
    if (this.trash.length > max) {
      this.trash.splice(max, this.trash.length - max);
    }
  }

  public removeDefinitively(id: string) {
    // this.posts_ids.delete(id);
    this.trash = this.trash.filter((post) => post.id !== id);
    this.socket.sendCacheToAdmin();
  }

  public restoreFromTrash(id: string) {
    const post = this.trash.find((post) => post.id === id);
    if (post) {
      this.trash = this.trash.filter((post) => post.id !== id);
      this.cache.unshift(post);
      this.clampCache();
      this.socket.sendCacheToAdmin();
    }
  }

  public moveToTrash(id: string) {
    const post = this.cache.find((post) => post.id === id);
    if (post) {
      this.cache = this.cache.filter((post) => post.id !== id);
      this.trash.unshift(post);
      this.clampTrash();
      this.socket.sendCacheToAdmin();
    }
  }

  public clearTrash() {
    this.trash = [];
    this.socket.sendCacheToAdmin();
  }

  public clearAll() {
    this.cache = [];
    this.trash = [];
    this.socket.sendCacheToAdmin();
  }

  public saveImageToDisk(images: Buffer[]) {
    for(var i=0; i<images.length; i++){
      const random = Math.floor(Math.random() * (99 - 1 + 1) + 1);
      const randomFileName = "assets/photo_" + Date.now() + random + ".png";
      writeFileSync(randomFileName, images[i]);
    }
  }

  public dataURLtoFile(dataurl: string, filename: string): File {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
  

}
