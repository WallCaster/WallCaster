import { SocialNetwork } from "./SocialNetwork";

export type PostImage = {
    url: string;
}

let idMax = 0;

export class Post {
    private _id: number;
    private _content: string;
    private _author: string;
    private _date: Date;
    private _url: string;
    private _source: SocialNetwork;
    private _image?: PostImage;

    constructor(content: string, author: string, date: Date, url: string, source: SocialNetwork, image?: PostImage) {
        this._content = content;
        this._author = author;
        this._date = date;
        this._url = url;
        this._source = source;
        this._image = image;
        this._id = idMax++;
    }

    public get id(): number {
        return this._id;
    }

    public get content(): string {
        return this._content;
    }

    public get author(): string {
        return this._author;
    }

    public get date(): Date {
        return this._date;
    }

    public get url(): string {
        return this._url;
    }

    public get source(): SocialNetwork {
        return this._source;
    }

    public get image(): PostImage | undefined {
        return this._image;
    }

    public set image(value: PostImage | undefined) {
        this._image = value;
    }
}