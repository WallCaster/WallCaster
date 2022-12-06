import { useEffect, useState } from 'react';
import useSocket from '../../hooks/useSocket';

export const SocketTest = () => {
  const [message, setMessage] = useState<string[]>(['no message yet']);
  const socket = useSocket('http://localhost:3001', {
    onConnect: (s) => {
      s.on('message', (message) => {
        setMessage((prev) => [...prev, message]);
      });
    },
  });
  const onClick = () => {
    if (socket) {
      socket.emit('message', 'hello from client');
    }
  };
  return (
    <div className='border p-5 border-gray-500'>
      <h1 className='text-2xl'>Socket Test</h1>
      <p>Socket is {socket ? 'connected' : 'disconnected'}</p>
      <p>Messages from server: {message.length}</p>
      <div className='py-5'>
        {message.map((msg, index) => (
          <p key={index} className='font-mono'>
            {msg}
          </p>
        ))}
      </div>
      <button onClick={onClick} className='bg-blue-400 rounded-lg text-white px-3 py-2 my-4'>
        Click to send msg to server
      </button>
    </div>
  );
};
