import { Config } from '../config';
import { SocialNetworkType, Post, WithId } from '../post';

export abstract class Api {
  protected socialNetwork: SocialNetworkType;

  constructor(socialNetwork: SocialNetworkType) {
    this.socialNetwork = socialNetwork;
  }

  public abstract fetchPosts(): Promise<WithId<Post>[]>;
}
