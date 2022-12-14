import { Config } from '../config';
import { SocialNetwork, WithId, Post, postWithId } from '../post';
import { Api } from './api';

export class ApiRandom extends Api {
  constructor(config: Config) {
    super(config, SocialNetwork.TWITTER);
  }

  public fetchPost(): WithId<Post> {
    return postWithId({
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nunc nisl ultricies nunc' +
        randomString(10),
      author: 'random user ' + randomString(2),
      authorId: '@random_user_' + randomString(3),
      authorImage: 'https://placeimg.com/192/192/people',
      date: new Date(Date.now()),
      originUrl: 'http://localhost:3000/twitter',
      socialNetwork: this.socialNetwork,
    });
  }
}

function randomString(length: number) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
