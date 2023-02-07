import { Config } from '../config';
import { SocialNetwork, WithId, Post, postWithId } from '../post';
import { Api } from './api';

export class ApiRandom extends Api {
  constructor() {
    super(SocialNetwork.TWITTER);
  }

  public async fetchPosts(): Promise<WithId<Post>[]> {
    const value = [
      postWithId({
        content: {
          text:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nunc nisl ultricies nunc' +
            randomString(10),
        },
        author: {
          name: 'Random User ' + randomString(3),
          username: '@random_user_' + randomString(3),
          image: 'https://placeimg.com/192/192/people',
        },
        date: new Date(Date.now()),
        originUrl: 'http://localhost:3000/twitter',
        socialNetwork: this.socialNetwork,
      }),
    ];
    return Promise.resolve(value);
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
