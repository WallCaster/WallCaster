import { ArrowLeftOnRectangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import useSocket from '../../hooks/useSocket';
import type { Config } from '../types/config';
import type { FilterData, Post } from '../types/post';
import AdminForm from './Form';
import { FormComponent, FormTitle } from './FormComponent';
import { LiveFeed } from './LiveFeed';

const AdminPage = () => {
  const [config, setConfig] = useState<null | Config>(null);
  const [serverIp, setServerIp] = useState('http://localhost:3001');
  const [cache, setCache] = useState<(Post & FilterData)[]>([]);
  const [trash, setTrash] = useState<(Post & FilterData)[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [password, setPassword] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const socket = useSocket(serverIp, (socket) => {
    socket.on('connect', () => {
    });
    socket.on('cache', (cache: (Post & FilterData)[]) => {
      setCache(cache);
    });

    socket.on('trash', (cacheFiltered: (Post & FilterData)[]) => {
      setTrash(cacheFiltered);
    });

    socket.on('config', (config: Config) => {
      setConfig(config);
    });

    socket.on('token', (token: string) => {
      setToken(token);
      socket.emit('setadmin', token);
      socket.emit('getConfig', token);
      socket.emit('getImages', token);
    });

    socket.on('images', (info) => {
      if (info.images) {
        const files = info.buffers.map((buffer: string) => {
          const randomFileName = 'assets/photo_' + Date.now() + '.png';
          return dataURItoFile(buffer, randomFileName);
        });
        setImages(files);
      }
    });
  });

  function getConfig() {
    if (!socket) return;
    console.log('Asking for config');
    socket.emit('getConfig', token);
  }

  function sendConfig(config: Config) {
    console.log('send config...');
    if (!socket) return;
    console.log('Sending config');
    socket.emit('setConfig', config, token);
  }

  function cacheDelete(id: string) {
    if (!socket) return;
    console.log('Deleting from cache');
    socket.emit('cacheDelete', id, token);
  }

  function trashDelete(id: string) {
    if (!socket) return;
    console.log('Deleting from trash');
    socket.emit('trashDelete', id, token);
  }

  function restore(id: string) {
    if (!socket) return;
    console.log('Restoring from trash');
    socket.emit('restore', id, token);
  }

  function clearTrash() {
    if (!socket) return;
    console.log('Clearing trash');
    socket.emit('clearTrash', token);
  }

  function getImages() {
    if (!socket) return;
    console.log('Asking for images');
    socket.emit('getImages', token);
  }

  function sendImages(images: File[]) {
    console.log('send images...');
    if (!socket) return;
    console.log('Sending images');
    socket.emit('setImages', images, token);
  }
  function clearAll() {
    if (!socket) return;
    console.log('Clearing all');
    socket.emit('clearAll', token);
  }

  function dataURItoFile(dataURI: string, fileName: string): File {
    // Convertir la chaîne base64 en blob
    const byteString = atob(dataURI);
    const mimeString = 'image/jpeg';
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: mimeString });

    // Créer et retourner l'objet File
    return new File([blob], fileName, { type: mimeString });
  }

  if (!socket?.connected)
    return (
      <div className='p-8 flex flex-col items-center gap-10 max-w-7xl grow justify-center'>
        <div className='h-40'>
          <img src='/banner.png' alt='banner-title' className='object-cover h-full' />
        </div>
        <div className='col-span-6 sm:col-span-3'>
          <label htmlFor='serverIp' className='block text-sm font-medium text-gray-700'>
            What is the server IP?
          </label>
          <input
            type='text'
            name='serverIp'
            id='serverIp'
            value={serverIp}
            onChange={(e) => setServerIp(e.target.value)}
            className='mt-1 block w-full max-w-lg border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
        </div>
        <p className='font-bold text-xl opacity-20'>You are not connected</p>
      </div>
    );

  if (!token || !config)
    return (
      <div className='p-8 flex flex-col items-center gap-10 max-w-7xl grow justify-center'>
        <div className='h-40'>
          <img src='/banner.png' alt='banner-title' className='object-cover h-full' />
        </div>
        <div className='col-span-6 sm:col-span-3'>
          <label htmlFor='serverIp' className='block text-sm font-medium text-gray-700'>
            What is the server <b>password</b>?
          </label>
          <form
            onSubmit={() => {
              socket.emit('login', password);
            }}
          >
          <input
            type='text'
            name='serverIp'
            id='serverIp'
            value={password || ''}
            onChange={(e) => setPassword(e.target.value)}
            className='mt-1 block w-full max-w-lg border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
          <button className='mt-2 p-2 bg-blue-500 w-full hover:bg-blue-700 text-white font-bold rounded'>Login</button>
          </form>
        </div>
        <p className='font-bold text-xl text-green-600'>You are connected to the server</p>
      </div>
    );

  return (
    <div className='p-0 flex flex-col items-center w-full grow' id='feed'>
      <div className='flex gap-6 items-center px-6 justify-center py-12 w-full max-w-5xl'>
        <div className='h-32 -m-4'>
          <img src='/banner.png' alt='banner-title' className='object-cover h-full' />
        </div>
        <div className='mx-auto'></div>
        <button
          className='p-2 text-gray-900 hover:bg-gray-200 rounded-lg'
          onClick={getConfig}
          title='Synchronize with server'
        >
          <ArrowPathIcon className='h-6 w-6' />
        </button>
        <button
          className='p-2 bg-red-400 hover:bg-red-500 text-gray-100 hover:text-white rounded-lg'
          onClick={() => {
            setServerIp('http://localhost:3001!');
            setPassword(null);
            setToken(null);
            setConfig(null);
            setImages([]);
          }}
          title='Disconnect'
        >
          <ArrowLeftOnRectangleIcon className='h-6 w-6' />
        </button>
      </div>
      <div className='flex flex-col gap-4 w-full mb-10 items-center'>
        <div className='flex gap-6 items-center px-6 py-3 w-full max-w-5xl'>
          <FormTitle
            title='Live Feed'
            description='Queue of posts to be displayed and their status, you can remove them from the queue or restore them from the trash.'
          />
        </div>
        <LiveFeed
          cache={cache}
          cacheDelete={cacheDelete}
          trash={trash}
          trashDelete={trashDelete}
          restore={restore}
          clearTrash={clearTrash}
        />
      </div>
      <AdminForm
        config={config}
        setConfig={(c) => sendConfig(c)}
        onClear={clearAll}
        onCancel={() => {
          getConfig();
          getImages();
        }}
        images={images}
        setImages={(i) => sendImages(i)}
      />
    </div>
  );
};

export default AdminPage;
