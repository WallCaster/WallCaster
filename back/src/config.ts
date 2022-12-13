import { join } from 'path';
import { readFileSync, writeFileSync} from 'fs';

export class Config {

    private _numberOfScreens: number

    private _dataRange: number
   
    private _forbiddenWords: Array<string>
    
    private _whiteListAuthors: Array<string>
    
    private _whiteListHashtags: Array<string>
    
    private _allowSound: boolean
    
    private _allowVideo: boolean 
    
    private _allowImage: boolean 
    
    constructor() {
        this._numberOfScreens = 0
        this._dataRange = 0
        this._forbiddenWords = []
        this._whiteListAuthors = []
        this._whiteListHashtags = []
        this._allowSound = false 
        this._allowVideo = false 
        this._allowImage = false
        this.writeConfigToFile()
    }

    public writeConfigToFile(fileName : string = "settings.json") : void {

        let contentToWrite : any = JSON.stringify(this, null, " ") 
   

        writeFileSync(join(__dirname, fileName), contentToWrite, {
            flag: 'w',
          });

    }

    public readConfigFromFile(fileName : string = "settings.json") : void {
        
        let contentRead : Config = JSON.parse(readFileSync(join(__dirname, fileName), 'utf-8'));
        
        this._numberOfScreens = contentRead._numberOfScreens
        this._dataRange = contentRead._dataRange
        this._forbiddenWords = contentRead._forbiddenWords
        this._whiteListAuthors = contentRead.whiteListAuthors
        this._whiteListHashtags = contentRead._whiteListHashtags
        this._allowSound = contentRead.allowSound
        this._allowImage = contentRead._allowImage
    }

    public toString() : string {
        let resStr : string = "Number of screens = " + this._numberOfScreens +
        "\n Data Range = " + this._dataRange +
        "\n Forbidden Words = " + this._forbiddenWords.toString +
        "\n White List Authors = " + this._whiteListAuthors.toString +
        "\n White List Hashtags = " + this._whiteListHashtags.toString +
        "\n Allow Sound = " + this._allowSound +
        "\n Allow Video = " + this._allowVideo +
        "\n Allow Image = " + this._allowImage + "\n"
        return resStr
    }

    public get numberOfScreens(): number {
        return this._numberOfScreens
    }
    public set numberOfScreens(value: number) {
        this._numberOfScreens = value
    }

    public get dataRange(): number {
        return this._dataRange
    }
    public set dataRange(value: number) {
        this._dataRange = value
    }

    public get forbiddenWords(): Array<string> {
        return this._forbiddenWords
    }
    public set forbiddenWords(value: Array<string>) {
        this._forbiddenWords = value
    }

    public get whiteListAuthors(): Array<string> {
        return this._whiteListAuthors
    }
    public set whiteListAuthors(value: Array<string>) {
        this._whiteListAuthors = value
    }

    public get whiteListHashtags(): Array<string> {
        return this._whiteListHashtags
    }
    public set whiteListHashtags(value: Array<string>) {
        this._whiteListHashtags = value
    }

    public get allowSound(): boolean {
        return this._allowSound
    }
    public set allowSound(value: boolean) {
        this._allowSound = value
    }

    public get allowVideo(): boolean {
        return this._allowVideo
    }
    public set allowVideo(value: boolean) {
        this._allowVideo = value
    }

    public get allowImage(): boolean {
        return this._allowImage
    }
    public set allowImage(value: boolean) {
        this._allowImage = value
    }
}