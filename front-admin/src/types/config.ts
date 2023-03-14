
export type Config = {
  maxStoreSize: number;
  rotationInterval: number;
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
    useSentiment: boolean;
    useBanwords: boolean;
    useBlockImages: boolean;
    forbiddenWords: string[];
  };
};

export type DateRange = {
  start: Date;
  end: Date;
};