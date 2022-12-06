import * as io from 'socket.io-client';
import { useState, useEffect } from 'react';

const useSocket = (url: string, params?: { onConnect?: (socket: io.Socket) => void }) => {
  const [socket, setSocket] = useState<io.Socket | null>(null);

  // This is called when the component is mounted
  useEffect(() => {
    const socket = io.io(url);
    console.log('socket', socket);

    socket.on('connect', () => {
      if (params && params.onConnect) params.onConnect(socket);
    });
    setSocket(socket);

    // This is called when the component is unmounted
    return () => {
      socket.off('connect');
      socket.disconnect();
    };
  }, [url]);

  return socket
};

export default useSocket;
