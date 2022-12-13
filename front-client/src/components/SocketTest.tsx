import { useState } from 'react';
import useSocket from '../../hooks/useSocket';

export function SocketTest() {
  const [message, setMessage] = useState<string[]>([]);
  const socket = useSocket('http://localhost:3001', (socket) => {
    socket.on('message', (message) => {
      setMessage((prev) => [...prev, message]);
    });
  });

  function onClick() {
    if (socket) {
      socket.emit('message', 'hello from client');
    }
  }

  return (
    <div className='border p-5 border-gray-500 flex flex-col gap-5'>
      <h1 className='text-2xl'>
        Socket is <span className='font-bold text-red-400'>{socket ? 'connected' : 'disconnected'}</span>
      </h1>
      <button onClick={onClick} className='btn'>
        Click to send msg to server (server has 1s delay)
      </button>
      <p>Messages from server: {message.length}</p>
      <div className='font-mono'>
        {message.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  );
}
