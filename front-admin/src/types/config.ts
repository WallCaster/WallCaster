
export type Config = {
  maxStoreSize: number;
  rotationInterval: number;
  query: {
    useTwitterApi: boolean;
    twitter: {
      fetchInterval: number;
      fetchQuantity: number;
      maxDateRange: number;
      useWhitelistHashtags: boolean;
      whitelistHashtags: string[];
      keywords: string[];
      languages: string[];
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