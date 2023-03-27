import * as io from 'socket.io';
import { App } from './app';
import configManager, { Config } from './config';
import { Post } from './post';

const LISTENING_PORT = 3001;

type SocketId = string;

export class SocketServer {
  private rooms: Map<string, SocketId[]> = new Map();
  private server: io.Server;
  private clients: Map<SocketId, io.Socket> = new Map();
  private app: App;

  constructor(app: App) {
    this.app = app;
    this.server = new io.Server({ cors: { origin: '*' } });
    this.server.on('connection', this.onConnect.bind(this));
    this.server.on('disconnect', this.onDisconnect.bind(this));
    this.server.listen(LISTENING_PORT);
    console.log('listening for connections on port', LISTENING_PORT);
  }

  public getRoomsIds(): string[] {
    return Array.from(this.rooms.keys());
  }

  private onConnect(socket: io.Socket) {
    // add new client to the list
    if (!this.rooms.has('default')) this.rooms.set('default', [socket.id]);
    else this.rooms.get('default')!.push(socket.id);
    socket.join('default');
    this.clients.set(socket.id, socket);

    // add listeners

    // socket.onAny((event, ...args) => {
    //   console.log(`incoming event '${event}':`, args);
    // });

    socket.on('getConfig', () => {
      socket.emit('config', configManager.config);
    });

    socket.on('setConfig', (config: Config) => {
      configManager.config = config;
      configManager.writeConfigToFile();
      this.app.restart();
      socket.emit('config', configManager.config);
    });

    socket.on('setadmin', () => {
      socket.join('admin');
      this.sendCacheToAdmin();
    });

    socket.on('cacheDelete', (id: string) => {
      this.app.moveToTrash(id);
    });

    socket.on('trashRestore', (id: string) => {
      this.app.restoreFromTrash(id);
    });

    socket.on('trashDelete', (id: string) => {
      this.app.removeDefinitively(id);
    });

    socket.on('setImages', (image) => {
      console.log(typeof image);
      if(image === undefined) {
        console.log("IMAGE UNDEFINED");
      }
      else {
        console.log("IMAGE DEFINI : " + image.length);
        this.app.addImages(image);
      }
    })

    // socket.on('setImages', (imageUrls: string[]) => {
    //   if(imageUrls === undefined) {
    //     console.log("IMAGE UNDEFINED");
    //   }
    //   else {
    //     console.log("IMAGE DEFINI : " + imageUrls.length);
    //     const images = imageUrls.map((imageUrl) => {
    //       const parts = imageUrl.split(',')!;
    //       const mimeType = parts[0].match(/:(.*?);/)![1];
    //       const base64Data = parts[1];
    //       const byteCharacters = atob(base64Data);
    //       const byteArrays = [];
    //       for (let i = 0; i < byteCharacters.length; i++) {
    //         byteArrays.push(byteCharacters.charCodeAt(i));
    //       }
    //       const fileData = new Uint8Array(byteArrays);
    //       const uniqueFileName = `image-${Date.now()}.png`;
    //       return new File([fileData], uniqueFileName, { type: mimeType });
    //     });
    //     this.app.addImages(images);
    //   }

      
    // });



    

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
    console.log('sending post to all clients : ' + post.id);

    this.rooms.forEach((_, room) => {
      this.server.to(room).emit('post', post);
    });
  }

  public sendPostToRoom(room: string, post: Post) {
    console.log('sending post to room ' + room + ' : ' + post.id);
    this.server.to(room).emit('post', post);
  }

  public sendImageToRoom(room: string, image: string) {
    console.log('sending image to room ' + room + ' : ' + image);
    this.server.to(room).emit('image', image);
  }

  public getNumberOfClients(): number {
    return this.clients.size;
  }

  // send post to a specific client
  public sendPostTo(clientId: SocketId, post: Post) {
    if (this.clients.has(clientId)) this.clients.get(clientId)!.emit('post', post);
  }

  public sendCacheToAdmin() {
    this.server.to('admin').emit('cache', this.app.getCache());
    this.server.to('admin').emit('trash', this.app.getTrash());
  }
}
