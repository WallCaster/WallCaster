import { Transition } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { useTimeoutFn } from 'react-use';
import useSocket from '../../hooks/useSocket';
import type { Post } from '../types/post';
import { PostCard } from './PostCard';
export const App = () => {
  const placeholder: Post = {
    id: '1',
    api: 'twitter',
    author: {
      name: 'John Doe',
      username: 'johndoe',
      image: 'https://i.pravatar.cc/300',
    },
    content: {
      text: 'Hello World',
      images: [
        'https://placeimg.com/1000/512/nature',
        'https://placeimg.com/1000/512/animals',
        'https://placeimg.com/1000/512/any/sepia',
        'https://placeimg.com/1000/512/nature/sepia',
      ],
    },
    date: new Date(),
    originUrl: 'https://twitter.com/johndoe/status/1',
  };

  const [post, setPost] = useState<Post | File | null>(null);
  const [nextPost, setNextPost] = useState<Post | File | null>(null);
  const [serverIp, setServerIp] = useState('http://localhost:3001');
  const [probaPhoto, setProbaPhoto] = useState<number | 0>(0);
  let [isShowing, setIsShowing] = useState(true);
  let [, , resetIsShowing] = useTimeoutFn(() => setIsShowing(true), 400);
  const socket = useSocket(serverIp, (socket) => {
    socket.on('post', (p) => {
      updatePost(p);
    });
  });

  function updatePost(p: Post | File) {
    setNextPost(p);
    setIsShowing(false);
    resetIsShowing();
  }

  useEffect(() => {
    if (!post && nextPost) {
      setPost(nextPost);
      setNextPost(null);
    }
  }, [post, nextPost]);


  if (socket == null) {
    return (
      <div className='flex flex-col h-full bg-red-200 p-20 gap-5 text-red-800'>
        <h1 className='font-black text-6xl'>NOT CONNECTED</h1>
        <input
          type='text'
          placeholder='Type here'
          value={serverIp}
          onChange={(e) => setServerIp(e.target.value)}
          className='w-full max-w-xs bg-black/10 p-2 border-b-4 border-b-white/50 text-sm'
        />
      </div>
    );
  }
  return (
    <div className='relative h-full overflow-hidden'>
      <img src='/abstract.webp' alt='' className='object-cover absolute h-full w-full -z-10 blur-lg scale-110' />
      <div className='h-full px-16 py-14 flex items-center justify-center'>
        {post && (
          <Transition
            appear
            show={isShowing}
            enter='transform transition duration-[500ms]'
            enterFrom='opacity-0 rotate-[40deg] scale-50 translate-x-[50vw] -translate-y-32'
            enterTo='opacity-100 rotate-0 scale-100'
            leave='transform duration-[300ms] transition ease-[cubic-bezier(.6,-0.46,.63,.75)]'
            leaveFrom='opacity-100 rotate-0 scale-100 '
            leaveTo='opacity-0 rotate-[-40deg] scale-50 -translate-x-[50vw] -translate-y-32'
            afterLeave={() => {
              setProbaPhoto(Math.random());
              setPost(nextPost);
              setNextPost(null);
            }}
          >
            {
               !(post instanceof File) && <PostCard post={post} className='rounded-3xl shadow-2xl' />
            }
            {
              (post instanceof File) && <div
                className={`flex flex-col bg-white overflow-hidden relative rounded-3xl shadow-2xl`}
                style={{ height: '90vh', maxWidth: '90vw' }}>
                <img src={URL.createObjectURL(post)} className='h-full w-full' />
              </div>
              
            }
            {/* {
              (probaPhoto < 0.5) && (
                <div
                  className={`flex flex-col bg-white overflow-hidden relative rounded-3xl shadow-2xl`}
                  style={{ height: '90vh', maxWidth: '90vw' }}>
                  <img src='https://placeimg.com/1000/512/nature' alt='' className='h-full w-full' />
                </div>
              )             
            }
            {
              (probaPhoto >= 0.5) && (
                <PostCard post={post} className='rounded-3xl shadow-2xl' />
              )             
            } */}
            
          </Transition>
        )}
        {/* <button
          onClick={() => {
            setIsShowing(false);
            resetIsShowing();
          }}
          className='absolute bottom-5 right-5 p-3 rounded-md text-white bg-black/20 hover:bg-black/40'
        >
          animate
        </button> */}
      </div>
    </div>
  );
};
