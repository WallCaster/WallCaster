import configManager from '../config';
import { ApiName, Post } from '../post';
import { randomUUID } from 'crypto';
import { Api } from './api';

export class ApiRandom extends Api {
  constructor() {
    super(ApiName.TWITTER);
  }

  public async fetchPosts(): Promise<Post[]> {
    const posts: Post[] = [
      {
        id: randomUUID(),
        content: {
          text:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nunc nisl ultricies nunc' +
            randomString(10),
          images: [ 'https://placeimg.com/1000/512/nature', 'https://placeimg.com/1000/512/animals', 'https://placeimg.com/1000/512/any/sepia', 'https://placeimg.com/1000/512/nature/sepia'],
          // images: [ 'https://placeimg.com/1000/512/nature', 'https://placeimg.com/1000/512/animals', 'https://placeimg.com/1000/512/any/sepia'],
          // images: [ 'https://placeimg.com/1000/512/nature', 'https://placeimg.com/1000/512/animals'],
          // images: [ 'https://placeimg.com/1000/512/nature'],
        },
        author: {
          name: 'Rand ' + randomString(3),
          username: '@random_' + randomString(5),
          image: 'https://i.pravatar.cc/300',
        },
        date: new Date(Date.now()),
        originUrl: 'http://localhost:3000/twitter',
        api: ApiName.TWITTER,
      },
    ];
    return Promise.resolve(posts);
  }

  protected getInterval(): number {
    return configManager.config.query.random.fetchInterval;
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
