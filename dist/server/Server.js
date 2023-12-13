"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerAPI = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const conexion_1 = __importDefault(require("../db/conexion"));
const config_1 = require("../config/config");
const routes_1 = __importDefault(require("../routes/routes"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const file_route_1 = require("../routes/file.route");
const socket = __importStar(require("../sockets/socket"));
class ServerAPI {
    static getInstance() {
        if (!this._instance) {
            this._instance = new ServerAPI();
        }
        return this._instance;
    }
    constructor() {
        this.app = (0, express_1.default)();
        this.port = config_1.globalConfig.PORT;
        this.server = http_1.default.createServer(this.app);
        this.io = new socket_io_1.Server(this.server, {
            cors: {
                origin: '*'
            }
        });
        this.route = '/api/v1';
        this.app_url = config_1.globalConfig.APP_URL;
        this.routeFile = '/www/uploads/:fileName';
        ServerAPI._io = this.io;
        this.conexionBD();
        this.middlewares();
        this.routes();
        this.onSocket();
    }
    static getIO() {
        return this._io;
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        // midleware for justifications files
        this.app.use(this.routeFile, file_route_1.routerStaticFile);
        // config stattics files server
        this.app.use(express_1.default.static('public'));
    }
    conexionBD() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield conexion_1.default.authenticate();
                console.log('Conexion to database successfully');
            }
            catch (e) {
                console.error('Unable to connect to the database:', e);
            }
        });
    }
    routes() {
        this.app.use(this.route, ...routes_1.default);
    }
    onSocket() {
        this.io.on('connection', client => {
            console.log("client connect:", client.id);
            socket.clientDisconnet(client);
        });
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log(`Server is online on PORT → ${this.app_url}:${this.port} `);
        });
    }
}
exports.ServerAPI = ServerAPI;
//# sourceMappingURL=Server.js.map