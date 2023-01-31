import { WithId, Post, SocialNetwork, postWithId } from "../post";
import { Api } from "./api";

export class ApiTwitter extends Api{

    constructor() {
        super(SocialNetwork.TWITTER);
    }

    public fetchPosts(): WithId<Post>[] {

        // Base url
        let url : string = "https://api.twitter.com/2/tweets/search/recent?query=";

        // Max results
        let max_results : number = 10;

        // Values of search
        let lang : string = "fr";
        let hastag : string = "Lenine";

        // Build search part
        let search = "#"+hastag + " lang:" + lang;

        // Build url
        url = url + encodeURIComponent(search) + "&max_results=" + max_results;

        console.log(url);

        // Bearer token
        let BearerToken = "AAAAAAAAAAAAAAAAAAAAAJEylgEAAAAAxkdNxil3XDR%2FtKLvaBb71e%2FA7q8%3Du2crw3ChPNn3SiIG4ZCVgXnaqfSW58vNtQYdmGsJD6hBhBtyG2";

        const https = require('https');

        // Set the headers
        const options = {
            headers: {
                'Authorization': 'Bearer '+BearerToken
            }
        };

        // Start the request
        https.get(url, options, (res : any) => {

            console.log('headers:', res.headers);
          
            res.on('data', (d : any) => {
              process.stdout.write(d);
            });

        }).on('error', (e : any) => {
            console.error(e);
        });

        return [];

        /*return postWithId({
            content:{text : ""},
            author:{name : "", username : ""},
            date: new Date(Date.now()),
            originUrl:"",
            socialNetwork: this.socialNetwork
        });*/

    }
    
}