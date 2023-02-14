import { App } from '../app';
import { Post, ApiName } from '../post';

describe('App', () => {
  let app: App;
  let post: Post;

  beforeAll(() => {
    post = {
      id: '0',
      author: {
        name: 'Random User ',
        username: '@random_user_',
        image: 'https://placeimg.com/192/192/people',
      },
      content: {
        text: "content",
      },
      date: new Date(Date.now()),
      originUrl: 'http://localhost:3000/twitter',
      api: ApiName.TWITTER,
    };
  });

  beforeEach(() => {
    app = new App();
  });

  it('should return the next post in the cache', () => {
    app.addPost(post);
    expect(app.getNextPost()).toEqual(post);
  });

  it('should return null if there are no posts in the cache', () => {
    expect(app.getNextPost()).toBeNull();
  });

  // it('should remove a post from the cache', () => {
  //   app.addPost(post);
  //   app.removePost(0);
  //   expect(app.getNextPost()).toBeNull();
  // });
});
