export class PostImage {
    private url: string;
    
    constructor(theUrl: string) {
        this.url = theUrl;
    }

    public getUrl(): string {
        return this.url;
    }
}