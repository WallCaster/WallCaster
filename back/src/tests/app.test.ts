import { App } from '../app';
import { Post, ApiName, Content, Author, FilterData } from '../post';

describe('App', () => {
  let app: App;
  let post: Post;
  let postFiltered: Post & FilterData;

  beforeAll(() => {
    app = new App();

    const content: Content = {
      text: 'content',
    };

    const author: Author = {
      name: 'nameAuthor',
      username: 'usernameAuthor',
    };

    post = {
      id: '0',
      author: author,
      content: content,
      date: new Date(),
      originUrl: 'none',
      api: ApiName.TWITTER,
    };

    postFiltered = {
      ...post,
      passedBanwords: true,
      passedImages: true,
      passedSentiment: true,
      passedNsfw: true,
      filterDate: new Date(),
    };
  });

  beforeEach(() => {
    while (app.getNextPost() != null) {
      app.removeDefinitively('0');
    }
  });

  describe('getNextPost', () => {
    it('should return null if there are no posts in the cache', () => {
      expect(app.getNextPost()).toBeNull();
    });
  });

  describe('removePost', () => {
    it('should remove a post from the cache', () => {
      app.addPosts([post]);
      app.removeDefinitively('0');
      expect(app.getNextPost()).toBeNull();
    });

    it('should return null if there are no posts to remove in the cache', () => {
      app.removeDefinitively('0');
      expect(app.getNextPost()).toBeNull();
    });
  });

  describe('addPosts', () => {
    it('should return null if there are no posts added in the cache', () => {
      app.addPosts([]);
      expect(app.getNextPost()).toBeNull();
    });

    it('should return the next post in the cache', () => {
      app.addPosts([postFiltered]);
      expect(app.getNextPost()).toEqual(postFiltered);
    });

    it('should return the next post in the cache', () => {
      app['cache'] = [postFiltered, postFiltered];
      expect(app.getNextPost()).toEqual(postFiltered);
    });
  });
});
