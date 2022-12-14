import * as io from 'socket.io';
import { Config } from './config';
import { Post } from './post';

const LISTENING_PORT = 3001;

type SocketId = string;

export class SocketServer {
  private config: Config;
  private server: io.Server;
  private rooms: Map<string, SocketId[]>;
  private clients: Map<SocketId, io.Socket>;

  constructor(config: Config) {
    this.config = config;
    this.server = new io.Server({ cors: { origin: '*' } });
    this.rooms = new Map();
    this.clients = new Map();

    // don't add any event listeners here
    // add them in the onConnect function
    this.server.on('connection', this.onConnect.bind(this));
    this.server.on('disconnect', this.onDisconnect.bind(this));
    this.server.listen(LISTENING_PORT);
    console.log('listening for connections on port', LISTENING_PORT);
  }

  private onConnect(socket: io.Socket) {
    // add new client to the list
    if (!this.rooms.has('default')) this.rooms.set('default', [socket.id]);
    else this.rooms.get('default')!.push(socket.id);
    socket.join('default');
    this.clients.set(socket.id, socket);

    // add listeners
    socket.onAny((event, ...args) => {
      console.log(`incoming event '${event}':`, args);
    });

    console.log('new client connected');
  }

  private onDisconnect(socket: io.Socket) {
    // remove client from the rooms
    this.rooms.forEach((clientsIds, room) => {
      const index = clientsIds.indexOf(socket.id);
      if (index > -1) {
        clientsIds.splice(index, 1);
        if (clientsIds.length === 0) this.rooms.delete(room);
      }
    });

    // remove client from the list
    this.clients.delete(socket.id);

    // remove all listeners
    socket.removeAllListeners();

    console.log('client disconnected');
  }

  // send post to all clients
  public sendPostToAll(post: Post) {
    this.rooms.forEach((_, room) => {
      this.server.to(room).emit('post', post);
    });
  }

  public getNumberOfClients(): number {
    return this.clients.size;
  }

  // send post to a specific client
  public sendPostTo(clientId: SocketId, post: Post) {
    if (this.clients.has(clientId)) this.clients.get(clientId)!.emit('post', post);
  }
}
