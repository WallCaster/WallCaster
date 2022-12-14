export type PostImage = {
  url: string;
};

export type WithId<T> = T & { id: number };

export type Post = {
  author: Author;
  content: Content;
  image?: PostImage;
  date: Date;
  originUrl: string;
  socialNetwork: SocialNetwork;
};

export type Content = {
  text: string;
  images?: PostImage[];
};

export type Author = {
  name: string;
  username: string;
  image?: string;
};

export enum SocialNetwork {
  TWITTER,
  INSTAGRAM,
  FACEBOOK,
  LINKEDIN,
}
