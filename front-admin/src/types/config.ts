
/**
 * The config class
 * Singleton
 * @note The config is saved in a file called settings.json
 */
export type Config = {
   _numberOfScreens: number;
   _dataRange: DateRange;
   _forbiddenWords: string[];
   _whitelistAuthors: string[];
   _whitelistHashtags: string[];
   _allowSound: boolean;
   _allowVideo: boolean;
   _allowImage: boolean;
}

export type DateRange = {
  start: Date;
  end: Date;
};
