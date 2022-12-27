import { Config } from '../config';
import { SocialNetworkType, Post, WithId } from '../post';

export abstract class Api {
  protected socialNetwork: SocialNetworkType;
  protected config: Config;

  constructor(socialNetwork: SocialNetworkType) {
    this.socialNetwork = socialNetwork;
    this.config = Config.getInstance();
  }

  public abstract fetchPost(): WithId<Post>;
}
