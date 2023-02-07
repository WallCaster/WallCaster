import { ApiType, Post } from '../post';

export abstract class Api {
  protected apiName: ApiType;

  constructor(apiName: ApiType) {
    this.apiName = apiName;
  }

  public abstract fetchPosts(): Promise<Post[]>;
}
