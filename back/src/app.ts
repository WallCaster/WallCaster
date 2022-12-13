import { Api } from "./api";
import { Config } from "./config";
import { Filter } from "./filter";
import { Post } from "./post";
import { SocketServer } from "./socket-server";

export class App {
    private cache: Array<Post>;
    private apis: Array<Api>;
    private postsFiltered: Array<Post>;
    private socketServer: SocketServer;
    private filter: Filter;
    private config: Config;

    constructor() {
        this.cache = new Array<Post>();
        this.apis = new Array<Api>();
        this.postsFiltered = new Array<Post>();
        this.filter = new Filter();
        this.config = new Config();

        console.log('Starting server...');
        this.socketServer = new SocketServer(this.config);
    }

    public addAPI(api: Api) {
        if(!this.apis.includes(api)) {
            this.apis.push(api);
        }
    }

    public removeAPI(api: Api) {
        const index:number = this.apis.indexOf(api);
        if(index > -1) {
            this.apis.splice(index, 1);
        }
    }

    public addPost(post: Post) {
        if(!this.cache.includes(post)) {
            this.cache.push(post);
        }
    }

    public removePost(id: number) {
        if(id > -1 && id < this.apis.length) {
            this.apis.splice(id, 1);
        }
    }

    public run() {
        let start: number = new Date().getTime();

        while(true) {
            let end: number = new Date().getTime();
            if(end-start > 5000) {
                //this.postsFiltered = this.filter.apply(cache);

                //this.socketServer.sendPost(this.postsFiltered.pop);

                start = new Date().getTime();
            }
        }
    }


}