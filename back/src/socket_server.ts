import * as io from 'socket.io';

const LISTENING_PORT = 3001;

interface ServerToClientEvents {}

interface ClientToServerEvents {}

interface InterServerEvents {}

interface SocketData {}

export class SocketServer {
  private io: io.Server;

  // you shouldn't modify this function
  // if you want to add some logic when the server starts
  // then add it in the onConnect function
  constructor() {
    this.io = new io.Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>({
      cors: {
        origin: '*',
      },
    });
    this.io.on('connection', this.onConnect.bind(this));
    this.io.on('disconnect', this.onDisconnect.bind(this));
    this.io.listen(LISTENING_PORT);
    console.log('listening on port', LISTENING_PORT);
  }

  // this function is called when a client connects to the server
  // you can add some events listeners here
  private onConnect(socket: io.Socket) {
    socket.on('message', this.onMessage.bind(this, socket));
  }

  private onDisconnect(socket: io.Socket) {
    console.log('disconnected');
  }

  private onMessage(socket: io.Socket, message: string) {
    console.log('message', message);
    setTimeout(() => {
      socket.emit('message', 'I am the server and i received your message');
    }, 1000);
  }
}
