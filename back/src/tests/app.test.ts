import { App } from '../app';
import { Post, ApiName, Content, Author } from '../post';

describe('App', () => {
  let app: App;
  let post: Post;

  beforeAll(() => {
    app = new App();

    const content: Content = {
      text: "content"
    };

    const author: Author = {
      name: "nameAuthor",
      username: "usernameAuthor"
    }

    post = {
      id: '0',
      author: author,
      content: content,
      date: new Date(Date.now()),
      originUrl: 'none',
      api: ApiName.TWITTER,
    };
  });

  it('should return null if there are no posts in the cache', () => {
    expect(app.getNextPost()).toBeNull();
  });

  it('should return the next post in the cache', () => {
    app.addPost(post);
    expect(app.getNextPost()).toEqual(post);
  });

  it('should remove a post from the cache', () => {
    app.addPost(post);
    app.removePost('0');
    expect(app.getNextPost()).toBeNull();
  });
});
