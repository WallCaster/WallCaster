import { useState } from 'react';
import useSocket from '../../hooks/useSocket';
import type { Config } from '../types/config';

const AdminPage = () => {
  const [serverIp, setServerIp] = useState('http://localhost:3001');
  const socket = useSocket(serverIp, (socket) => {
    console.log('asking for config'); // TODO remove
    socket.emit('getConfig');
    socket.on('config', (config: Config) => {
      setConfig(config);
    });
  });

  const [config, setConfig] = useState<null | Config>(null);

  function updateConfig() {
    if (!socket) return;
    console.log('asking for config'); // TODO remove
    socket.emit('getConfig');
  }

  if (!socket?.connected)
    return (
      <div className='p-10 flex flex-col gap-6 max-w-3xl grow justify-center'>
        <h1 className='text-4xl'>WallCaster Admin Panel</h1>
        <div className='flex flex-col w-full max-w-xs gap-1'>
          <label>
            <span className='leading-3'>What is the server adress ?</span>
          </label>
          <input
            type='text'
            placeholder='Type here'
            value={serverIp}
            onChange={(e) => setServerIp(e.target.value)}
            className='border px-3 py-2 w-full max-w-xs'
          />
        </div>
        <p className='font-bold text-xl'>You are not connected</p>
      </div>
    );
  return (
    <div className='p-10 flex flex-col gap-6 max-w-3xl grow' onFocus={updateConfig}>
      <h1 className='text-4xl'>WallCaster Admin Panel</h1>
      <div className='flex flex-col w-full max-w-xs gap-1'>
        <label>
          <span className='leading-3'>What is the server adress ?</span>
        </label>
        <input
          type='text'
          placeholder='Type here'
          value={serverIp}
          onChange={(e) => setServerIp(e.target.value)}
          className='border px-3 py-2 w-full max-w-xs'
        />
      </div>
      <p className='font-bold text-xl text-green-600  '>You are connected!</p>

      <code>
        <pre>{JSON.stringify(config, null, 2)}</pre>
      </code>
    </div>
  );
};

export default AdminPage;
