import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';

/**
 * The config class
 * Singleton
 * @note The config is saved in a file called settings.json
 */
export class Config {
  private _numberOfScreens: number = 1;
  private _dataRange: DateRange = {
    start: new Date(2020, 0, 1),
    end: new Date(),
  };
  private _forbiddenWords: string[] = [];
  private _whitelistAuthors: string[] = [];
  private _whitelistHashtags: string[] = [];
  private _allowSound: boolean = true;
  private _allowVideo: boolean = false;
  private _allowImage: boolean = true;

  private static instance: Config;

  private constructor() {
    this.readConfigFromFile();
  }

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  /**
   * Writes the config to a file
   * @param config The config to write
   * @param fileName The name of the file to write to (default: settings.json)
   * @note overwrites the file if it already exists
   */
  public writeConfigToFile(fileName: string = 'settings.json'): void {
    let contentToWrite: any = JSON.stringify(this, null, ' ');
    writeFileSync(join(__dirname, fileName), contentToWrite, {
      flag: 'w',
    });
  }

  /**
   * Reads the config from a file and save it to the config object
   * @param fileName The name of the file to read from (default: settings.json)
   */
  public readConfigFromFile(fileName: string = 'settings.json'): void {
    try {
      const content = readFileSync(join(__dirname, fileName), 'utf8');
      const config = JSON.parse(content);
      this._numberOfScreens = config.numberOfScreens;
      this._dataRange = config.dataRange;
      this._forbiddenWords = config.forbiddenWords;
      this._whitelistAuthors = config.whitelistAuthors;
      this._whitelistHashtags = config.whitelistHashtags;
      this._allowSound = config.allowSound;
      this._allowVideo = config.allowVideo;
      this._allowImage = config.allowImage;
    } catch (e) {
      console.log('No config file found. Using default config.');
    }
  }

  public set(configObject: Partial<Config>): void {
    this._numberOfScreens = configObject.numberOfScreens ?? this.numberOfScreens;
    this._dataRange = configObject.dataRange ?? this.dataRange;
    this._forbiddenWords = configObject.forbiddenWords ?? this.forbiddenWords;
    this._whitelistAuthors = configObject.whitelistAuthors ?? this.whitelistAuthors;
    this._whitelistHashtags = configObject.whitelistHashtags ?? this.whitelistHashtags;
    this._allowSound = configObject.allowSound ?? this.allowSound;
    this._allowVideo = configObject.allowVideo ?? this.allowVideo;
    this._allowImage = configObject.allowImage ?? this.allowImage;
  }

  public get dataRange(): DateRange {
    return this._dataRange;
  }
  public get numberOfScreens(): number {
    return this._numberOfScreens;
  }
  public get forbiddenWords(): string[] {
    return this._forbiddenWords;
  }

  public get whitelistAuthors(): string[] {
    return this._whitelistAuthors;
  }

  public get whitelistHashtags(): string[] {
    return this._whitelistHashtags;
  }

  public get allowSound(): boolean {
    return this._allowSound;
  }

  public get allowVideo(): boolean {
    return this._allowVideo;
  }

  public get allowImage(): boolean {
    return this._allowImage;
  }
}

export type DateRange = {
  start: Date;
  end: Date;
};
