import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';

export type Config = {
  numberOfScreens: number;
  dataRange: DateRange;
  forbiddenWords: string[];
  whitelistAuthors: string[];
  whitelistHashtags: string[];
  allowSound: boolean;
  allowVideo: boolean;
  allowImage: boolean;
};

export type DateRange = {
  start: Date;
  end: Date;
};

export const defaultConfig: Config = {
  numberOfScreens: 1,
  dataRange: {
    start: new Date(2020, 0, 1),
    end: new Date(),
  },
  forbiddenWords: [],
  whitelistAuthors: [],
  whitelistHashtags: [],
  allowSound: true,
  allowImage: true,
  allowVideo: false,
};

/**
 * Writes the config to a file
 * @param config The config to write
 * @param fileName The name of the file to write to (default: settings.json)
 * @note overwrites the file if it already exists
 */
export function writeConfigToFile(config: Config, fileName: string = 'settings.json'): void {
  let contentToWrite: any = JSON.stringify(config, null, ' ');
  writeFileSync(join(__dirname, fileName), contentToWrite, {
    flag: 'w',
  });
}

/**
 * Reads the config from a file
 * @param fileName The name of the file to read from (default: settings.json)
 * @returns The config from the file
 * @note If the file does not exist, a default config is returned
 */
export function readConfigFromFile(fileName: string = 'settings.json'): Config {
  try {
    const content = readFileSync(join(__dirname, fileName), 'utf8');
    return JSON.parse(content);
  } catch (e) {
    console.log('No config file found, using default config');
    return defaultConfig;
  }
}
