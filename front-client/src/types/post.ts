
export type Post = {
  id: string;
  author: Author;
  content: Content;
  date: Date;
  originUrl: string;
  api: ApiType;
};

export type Content = {
  text: string;
  images?: string[];
};

export type Author = {
  name: string;
  username: string;
  image?: string;
};

export type ApiType = typeof ApiName[keyof typeof ApiName];

export const ApiName = {
  TWITTER: 'twitter',
  INSTAGRAM: 'instagram',
  FACEBOOK: 'facebook',
  LINKEDIN: 'linkedin',
  RANDOM: 'random',
} as const;
