import express, { Application, NextFunction, Request, Response }  from 'express';
import cors from 'cors';
import connectDB from '../db/conexion';
import { globalConfig } from '../config/config';
import routes from '../routes/routes';
import http from 'http';
import { Server } from 'socket.io';
import { routerStaticFile } from '../routes/file.route';
import * as socket from '../sockets/socket';

export class ServerAPI {

    private static _instance: ServerAPI;
    private app:Application;
    private port: number | string;
    private app_url: string;
    private route: string;
    private routeFile: string;
    private server:http.Server;
    public io:Server;

    public static get getInstance(): ServerAPI {
        if (!this._instance) {
            this._instance = new ServerAPI();
        }
        return this._instance;
    }    
     
    private constructor(){
        this.app = express();
        this.port = globalConfig.PORT;
        this.server = http.createServer(this.app);
        this.io = new Server(this.server,{
            cors:{
                origin:'*'
            }
        });
        this.route = '/api/v1';
        this.app_url = globalConfig.APP_URL;
        this.routeFile = '/www/uploads/:fileName';
        this.conexionBD();
        this.middlewares();
        this.routes();
        this.onSocket();
    }
    
    middlewares(){

        this.app.use( cors() );

        this.app.use( express.json() );
        // midleware for justifications files
        this.app.use( this.routeFile, routerStaticFile)
        // config stattics files server
        this.app.use( express.static('public') )
    }

    async conexionBD(){
        try {
            await connectDB.authenticate();
            console.log('Conexion to database successfully');
        } catch (e) {
            console.error('Unable to connect to the database:', e);
        }
    }

    routes(){
        this.app.use(this.route, ...routes )
    }

    onSocket(){

        this.io.on('connection', client => {
            console.log("client connect:", client.id);
            socket.clientDisconnet( client );
            socket.statusNotification( client, this.io);
        });
    }

    listen(){
        this.server.listen( this.port, ()=>{
            console.log(`Server is online on PORT → ${this.app_url}:${this.port} `)
        })
    }

}
