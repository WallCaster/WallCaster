
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