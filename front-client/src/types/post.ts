export type PostImage = {
  url: string;
};

export type WithId<T> = T & { id: number };

export type Post = {
  author: string;
  authorId: string;
  authorImage?: string;
  text: string;
  image?: PostImage;
  date: Date;
  originUrl: string;
  socialNetwork: SocialNetwork;
};

export enum SocialNetwork {
  TWITTER,
  INSTAGRAM,
  FACEBOOK,
  LINKEDIN,
}
