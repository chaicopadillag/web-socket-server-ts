import express, { Application } from 'express';
import { createServer } from 'http';
import { Socket, Server } from 'socket.io';
import cors from 'cors';
import socketController from '../controllers/socketController';

export default class ServerApp {
  app: Application;
  port: number | string;
  httpServer;
  io: Server;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.httpServer = createServer(this.app);
    this.io = new Server(this.httpServer);
    this.middleware();
    this.sockets();
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }

  sockets() {
    this.io.on('connection', socketController);
  }

  start() {
    this.httpServer.listen(this.port, () => {
      console.log(`Aplication run in port ${this.port}`);
    });
  }
}
