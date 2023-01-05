import { useState } from 'react';
import useSocket from '../../hooks/useSocket';
import type { Post, WithId } from '../types/post';
import { PostCard } from './PostCard';

export const PostsDisplayer = () => {
  const [posts, setPosts] = useState<WithId<Post>[]>([]);
  const [serverIp, setServerIp] = useState('http://back:3001');
  const socket = useSocket(serverIp, (socket) => {
    socket.on('post', (post) => {
      setPosts((prev) => [...prev, post]);
    });
  });
  return (
    <div>
      <div className='form-control w-full max-w-xs mb-4 opacity-50'>
        <label className='label'>
          <span className='label-text leading-3'>What is the Server ip</span>
        </label>
        <input
          type='text'
          placeholder='Type here'
          value={serverIp}
          onChange={(e) => setServerIp(e.target.value)}
          className='input input-sm input-bordered w-full max-w-xs'
        />
      </div>
      <p>Connected : {socket?.connected ? 'Yes' : 'No'}</p>
      {socket != null && (
        <>
          <h1>Number of posts received : {posts.length}</h1>
          {posts.length != 0 && (
            <>
              <h2>Last post received :</h2>
              <PostCard post={posts[posts.length - 1]} />
              <h2>Last post received (JSON) :</h2>
              <pre className='p-5 font-mono my-5 md:m-10 bg-zinc-800 text-white overflow-auto rounded shadow-inner'>
                <code>{JSON.stringify(posts[posts.length - 1], null, 2)}</code>
              </pre>
            </>
          )}
        </>
      )}
    </div>
  );
};
