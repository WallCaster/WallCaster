import { Config } from "./config"
import { Post } from "./post"

export abstract class Api {
    
    constructor( config : Config ) {
    }

    public abstract searchPostFromHashTag(): Post



}