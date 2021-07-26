import dotenv from 'dotenv';
import ServerApp from './models/serverApp';

dotenv.config();

const server = new ServerApp();
server.start();
