import * as io from 'socket.io-client';
import { useState, useEffect } from 'react';

/**
 * This hook is used to connect to a socket server
 * @param url the url of the socket server
 * @param callback a callback function that is called when the socket is connected
 */
const useSocket = (url: string, callback?: (socket: io.Socket) => void) => {
  const [socket, setSocket] = useState<io.Socket | null>(null);

  // This is called when the component is mounted
  useEffect(() => {
    const socket = io.io(url, { autoConnect: true });
    socket.on('connect', () => {
      console.log('%cConnected to socket!', 'color: lightgreen');
      setSocket(socket);
    });
    socket.on('disconnect', () => {
      console.log('%cDisconnected from socket, trying to reconnect...', 'color: red');
      setSocket(null);
    });
    if (callback) callback(socket);
    socket.onAny((event, ...args) => {
      console.log(`incoming event '${event}':`, args);
    });

    // This is called when the component is unmounted
    return () => {
      socket.disconnect();
    };
  }, []);

  return socket;
};

export default useSocket;
