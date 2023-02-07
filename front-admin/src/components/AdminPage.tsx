import { ArrowLeftOnRectangleIcon, CloudArrowDownIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import useSocket from '../../hooks/useSocket';
import type { Config } from '../types/config';
import AdminForm from './Form';

const AdminPage = () => {
  const [config, setConfig] = useState<null | Config>(null);
  const [serverIp, setServerIp] = useState('http://localhost:3001');
  const socket = useSocket(serverIp, (socket) => {
    socket.emit('getConfig');
    socket.on('config', (config: Config) => {
      setConfig(config);
    });
  });

  function getConfig() {
    if (!socket) return;
    socket.emit('getConfig');
  }

 function sendConfig(config: Config) {
    if (!socket) return;
    socket.emit('setConfig', config);
  }


  if (!socket?.connected || !config)
    return (
      <div className='p-8 flex flex-col gap-6 max-w-6xl grow justify-center'>
        <h1 className='text-4xl font-bold'>WallCaster Admin Panel</h1>
        <div className='col-span-6 sm:col-span-3'>
          <label htmlFor='serverIp' className='block text-sm font-medium text-gray-700'>
            What is the server adress ?
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
        <p className='font-bold text-xl'>You are not connected</p>
      </div>
    );

  return (
    <div className='p-8 flex flex-col gap-10 max-w-6xl grow'>
      <div className='flex gap-6 items-center'>
        <h1 className='text-4xl font-bold'>WallCaster Admin Panel</h1>
        <div className='mx-auto'></div>
        <button
          className='p-2 text-gray-900 hover:bg-gray-200 rounded-lg'
          onClick={getConfig}
          title='Overwrite with server configuration'
        >
          <CloudArrowDownIcon className='h-6 w-6' />
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
      <AdminForm config={config} setConfig={(c) => sendConfig(c)} />
    </div>
  );
};

export default AdminPage;
