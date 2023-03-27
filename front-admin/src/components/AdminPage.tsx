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
  const socket = useSocket(serverIp, (socket) => {
    socket.on('connect', () => {
      socket.emit('getConfig');
      socket.emit('setadmin');
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
  });

  function getConfig() {
    if (!socket) return;
    console.log('Asking for config');
    socket.emit('getConfig');
  }

  function sendConfig(config: Config) {
    if (!socket) return;
    console.log('Sending config');
    socket.emit('setConfig', config);
  }

  function cacheDelete(id: string) {
    if (!socket) return;
    console.log('Deleting from cache');
    socket.emit('cacheDelete', id);
  }

  function trashDelete(id: string) {
    if (!socket) return;
    console.log('Deleting from trash');
    socket.emit('trashDelete', id);
  }

  function restore(id: string) {
    if (!socket) return;
    console.log('Restoring from trash');
    socket.emit('restore', id);
  }

  function clearTrash() {
    if (!socket) return;
    console.log('Clearing trash');
    socket.emit('clearTrash');
  }

  if (!socket?.connected || !config)
    return (
      <div className='p-8 flex flex-col items-center gap-10 max-w-7xl grow justify-center'>
        <h1 className='text-6xl font-bold'>WallCaster</h1>
        <div className='col-span-6 sm:col-span-3'>
          <label htmlFor='serverIp' className='block text-sm font-medium text-gray-700'>
            What is the admin panel ip ?
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

  return (
    <div className='p-0 flex flex-col items-center w-full grow' id='feed'>
      <div className='flex gap-6 items-center px-6 justify-center py-12 w-full max-w-5xl'>
        <h1 className='text-4xl font-bold'>WallCaster Admin Panel</h1>
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
            setConfig(null);
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
        <LiveFeed cache={cache} cacheDelete={cacheDelete} trash={trash} trashDelete={trashDelete} restore={restore} clearTrash={clearTrash}/>
      </div>
      <AdminForm config={config} setConfig={(c) => sendConfig(c)} onCancel={() => getConfig()} />
    </div>
  );
};

export default AdminPage;
