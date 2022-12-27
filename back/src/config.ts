import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';

/**
 * The config class
 * Singleton
 * @note The config is saved in a file called settings.json
 */
export class Config {
  numberOfScreens: number = 1;
  dataRange: DateRange = {
    start: new Date(2020, 0, 1),
    end: new Date(),
  };
  forbiddenWords: string[] = [];
  whitelistAuthors: string[] = [];
  whitelistHashtags: string[] = [];
  allowSound: boolean = true;
  allowVideo: boolean = false;
  allowImage: boolean = true;

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
  public writeConfigToFile(config: Config, fileName: string = 'settings.json'): void {
    let contentToWrite: any = JSON.stringify(config, null, ' ');
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
      this.numberOfScreens = config.numberOfScreens;
      this.dataRange = config.dataRange;
      this.forbiddenWords = config.forbiddenWords;
      this.whitelistAuthors = config.whitelistAuthors;
      this.whitelistHashtags = config.whitelistHashtags;
      this.allowSound = config.allowSound;
      this.allowVideo = config.allowVideo;
      this.allowImage = config.allowImage;
    } catch (e) {
      console.error('Error while reading config file: ', e);
    }
  }
}

export type DateRange = {
  start: Date;
  end: Date;
};
