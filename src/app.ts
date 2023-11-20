


import dot from 'dotenv'
import { Server } from './server/Server'

dot.config();

const server = new Server();
server.listen();