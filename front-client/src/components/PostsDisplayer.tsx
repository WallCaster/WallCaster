import { useState } from 'react';
import useSocket from '../../hooks/useSocket';
import type { Post, WithId } from '../types/post';
import { PostCard } from './PostCard';

export const PostsDisplayer = () => {
  const [posts, setPosts] = useState<WithId<Post>[]>([]);
  const socket = useSocket('http://localhost:3001', (socket) => {
    socket.on('post', (post) => {
      setPosts((prev) => [...prev, post]);
    });
  });
  if (!socket) {
    return (
      <div>
        <p>Connected : no</p>
      </div>
    );
  }
  return (
    <div>
      <p>Connected : yes</p>
      <h1>Number of posts received : {posts.length}</h1>
      <h2>Last post received :</h2>
      {posts.length && <PostCard post={posts[posts.length - 1]} />}
    </div>
  );
};
