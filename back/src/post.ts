import { PostImage } from "./postImage";
import { SocialNetwork } from "./SocialNetwork";

export class Post {
    private id: number;
    private content: string;
    private author: string;
    private date: Date;
    private url: string;

    constructor(theContent: string, theAuthor: string, theDate: Date, theUrl: string, theImage: PostImage, source: SocialNetwork) {
        this.content = theContent;
        this.author = theAuthor;
        this.date = theDate;
        this.url = theUrl;
    }


}