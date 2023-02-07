import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';

export type Config = {
  numberOfScreens: number;
  query: {
    dateRange: DateRange;
    whitelistHashtags: string[];
    useWhitelistHashtags: boolean;
    whitelistAuthors: string[];
    useWhitelistAuthors: boolean;
  }
  filters: {
    forbiddenWords: string[];
    allowSound: boolean;
    allowVideo: boolean;
    allowImage: boolean;
  }
};

export type DateRange = {
  start: Date;
  end: Date;
};

/**
 * The config class
 * Singleton
 * @note The config is saved in a file called settings.json
 */
class ConfigManager {
  config : Config = {
    numberOfScreens: 1,
    query: {
      dateRange:{
        start: new Date(2020, 0, 1),
        end: new Date(),
      },
      whitelistAuthors: [],
      useWhitelistAuthors: false,
      whitelistHashtags: [],
      useWhitelistHashtags: false,
    },
    filters: {
      forbiddenWords: [],
      allowSound: true,
      allowVideo: false,
      allowImage: true,
    },
  }

  public constructor() {
    this.readConfigFromFile();
  }


  /**
   * Writes the config to a file
   * @param config The config to write
   * @param fileName The name of the file to write to (default: settings.json)
   * @note overwrites the file if it already exists
   */
  public writeConfigToFile(fileName: string = 'settings.json'): void {
    let contentToWrite: any = JSON.stringify(this.config, null, 2);
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
      this.config = JSON.parse(content);
    } catch (e) {
      console.log('No config file found. Using default config.');
    }
  }
}

const configManager = new ConfigManager();
export default configManager;