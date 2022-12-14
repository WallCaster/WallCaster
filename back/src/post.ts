
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