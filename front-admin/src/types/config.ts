
export type Config = {
  maxStoreSize: number;
  query: {
    useTwitterApi: boolean;
    twitter: {
      fetchInterval: number;
      fetchQuantity: number;
      dateRange: DateRange;
      useWhitelistHashtags: boolean;
      whitelistHashtags: string[];
      useWhitelistAuthors: boolean;
      whitelistAuthors: string[];
    };
    useRandomApi: boolean;
    random: {
      fetchInterval: number;
    };
  };
  filter: {
    useEnglishSentiment: boolean;
    useForbiddenWords: boolean;
    forbiddenWords: string[];
    allowVideo: boolean;
    allowImage: boolean;
  };
};

export type DateRange = {
  start: Date;
  end: Date;
};
