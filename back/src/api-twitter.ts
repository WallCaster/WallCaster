import { Api } from "./api"
import { Config } from "./config"
import { Post } from "./post"
import { SocialNetwork } from "./SocialNetwork"

export class ApiTwitter extends Api {

    public static origin: SocialNetwork = SocialNetwork.TWITTER
    
    constructor(config : Config) {
        super(config)
    }

    public searchPostFromHashTag(): Post {
        return new Post('trop stylée la conférence', 'Yanis', new Date(Date.now()), 'http://localhost:3000/twitter', ApiTwitter.origin)
    }
}
