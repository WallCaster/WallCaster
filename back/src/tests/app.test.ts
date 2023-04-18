import { App } from '../app';
import { FilterData, Post } from '../post';
const testPost: Post = {
  id: '1',
  api: 'twitter',
  author: {
    name: 'test',
    username: 'test',
  },
  content: {
    text: 'test',
  },
  date: new Date(),
  originUrl: 'test',
};
const testFilteredPost: Post & FilterData = {
  id: '1',
  api: 'twitter',
  author: {
    name: 'test',
    username: 'test',
  },
  content: {
    text: 'test',
  },
  date: new Date(),
  originUrl: 'test',
  filterDate: new Date(),
  passedBanwords: true,
  passedImages: true,
  passedSentiment: true,
  passedNsfw: true,
};
describe('App', () => {
  let app: App;

  beforeEach(() => {
    process.env.API_KEY_TWITTER = 'test_key' ;
    app = new App();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
    app["socket"].kill();
  });

  test('should initialize correctly', () => {
    expect(app.getCache()).toHaveLength(0);
    expect(app.getTrash()).toHaveLength(0);
  });

  it('should add posts to cache', async () => {
    const post: Post = testPost;
    const filterData = { passedBanwords: true, passedImages: true, passedSentiment: true, passedNsfw: true };
    const filterPostMock = jest.fn(() => Promise.resolve(filterData));
    app['socket'] = { sendCacheToAdmin: jest.fn() } as any;
    app['clampCache'] = jest.fn();

    app.addPosts([post]);

    expect(filterPostMock).toHaveBeenCalledWith(post);
    expect(app['cache']).toEqual([{ ...post, ...filterData }]);
    expect(app['clampCache']).toHaveBeenCalled();
    expect(app['socket'].sendCacheToAdmin).toHaveBeenCalled();
  });

  it('should not add duplicate posts to cache', async () => {
    const post: Post = testPost;
    const filterData = { passedBanwords: true, passedImages: true, passedSentiment: true, passedNsfw: true };
    const filterPostMock = jest.fn(() => Promise.resolve(filterData));
    app['socket'] = { sendCacheToAdmin: jest.fn() } as any;
    app['clampCache'] = jest.fn();

    app['posts_ids'].add(post.id);
    app.addPosts([post]);

    expect(filterPostMock).not.toHaveBeenCalled();
    expect(app['cache']).toEqual([]);
    expect(app['clampCache']).not.toHaveBeenCalled();
    expect(app['socket'].sendCacheToAdmin).not.toHaveBeenCalled();
  });

  it('should get cache', () => {
    const cache: (Post & FilterData)[] = [testFilteredPost];
    app['cache'] = cache;

    const result = app.getCache();

    expect(result).toEqual(cache);
  });

  it('should get trash', () => {
    const trash: (Post & FilterData)[] = [testFilteredPost];
    app['trash'] = trash;

    const result = app.getTrash();

    expect(result).toEqual(trash);
  });

  it('should remove a post from trash definitively', () => {
    const post = { id: '1', title: 'Test Post' };
    app['trash'] = [testFilteredPost];
    app['socket'] = { sendCacheToAdmin: jest.fn() } as any;

    app.removeDefinitively(post.id);

    expect(app['trash']).toEqual([]);
    expect(app['socket'].sendCacheToAdmin).toHaveBeenCalled();
  });

  it('should restore a post from trash to cache', () => {
    const post = { id: '1', title: 'Test Post' };
    app['trash'] = [testFilteredPost];
    app['cache'] = [];
    app['clampCache'] = jest.fn();
    app['socket'] = { sendCacheToAdmin: jest.fn() } as any;

    app.restoreFromTrash(post.id);

    expect(app['trash']).toEqual([]);
    expect(app['cache']).toEqual([post]);
    expect(app['clampCache']).toHaveBeenCalled();
    expect(app['socket'].sendCacheToAdmin).toHaveBeenCalled();
  });
});
