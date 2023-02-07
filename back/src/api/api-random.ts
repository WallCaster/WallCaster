import { ApiName, Post } from '../post';
import { getUUID } from '../utils/post-helper';
import { Api } from './api';

export class ApiRandom extends Api {
  constructor() {
    super(ApiName.TWITTER);
  }

  public async fetchPosts(): Promise<Post[]> {
    const posts: Post[] = [
      {
        id: getUUID(),
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
        api: ApiName.RANDOM,
      },
    ];
    return Promise.resolve(posts);
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
