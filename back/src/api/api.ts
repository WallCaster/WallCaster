import { Config } from '../config';
import { SocialNetwork, Post } from '../post';

export abstract class Api {
  protected socialNetwork: SocialNetwork;

  constructor(config: Config, socialNetwork: SocialNetwork) {
    this.socialNetwork = socialNetwork;
  }

  public abstract fetchPost(): Post;
}
