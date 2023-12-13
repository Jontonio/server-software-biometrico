


import dot from 'dotenv'
import { ServerAPI } from './server/ServerAPI'

dot.config();

const server = ServerAPI.getInstance;
server.listen();