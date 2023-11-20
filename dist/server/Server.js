"use strict";
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
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const conexion_1 = __importDefault(require("../db/conexion"));
const config_1 = require("../config/config");
const routes_1 = __importDefault(require("../routes/routes"));
const file_route_1 = require("../routes/file.route");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = config_1.globalConfig.PORT;
        this.route = '/api/v1';
        this.app_url = config_1.globalConfig.APP_URL;
        this.routeFile = '/www/uploads/:fileName';
        this.conexionBD();
        this.middlewares();
        this.routes();
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
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is online on PORT → ${this.app_url}:${this.port} `);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=Server.js.map