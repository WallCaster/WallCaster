import * as io from 'socket.io';

const LISTENING_PORT = 3001;

export class SocketServer {
  private server: io.Server;

  constructor() {
    this.server = new io.Server({
      cors: {
        origin: '*',
      },
    });

    // don't add any event listeners here
    // add them in the onConnect function
    this.server.on('connection', this.onConnect.bind(this));
    this.server.on('disconnect', this.onDisconnect.bind(this));
    this.server.listen(LISTENING_PORT);
    console.log('listening on port', LISTENING_PORT);
  }

  private onConnect(socket: io.Socket) {
    socket.onAny((event, ...args) => {
      console.log(`incoming event '${event}':`, args);
    });
    socket.on('message', this.onMessage.bind(this, socket));
  }

  private onDisconnect(socket: io.Socket) {
    socket.removeAllListeners();
  }

  private onMessage(socket: io.Socket, message: string) {
    setTimeout(() => {
      console.log('sending responce to client');
      socket.emit('message', { hello: 'I am  the server and i received your message' });
    }, 1000);
  }
}
