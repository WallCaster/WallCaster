export type PostImage = {
  url: string;
};

let idMax = 0;

export function generateId(): number {
  idMax += 1;
  return idMax;
}

export function postWithId(post: Post): WithId<Post> {
  return {
    ...post,
    id: generateId(),
  };
}

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
