import express, { Application, NextFunction, Request, Response }  from 'express';
import cors from 'cors';
import connectDB from '../db/conexion';
import { globalConfig } from '../config/config';
import routes from '../routes/routes';
import { routerStaticFile } from '../routes/file.route';

export class Server {

    private app:Application;
    private port: number | string;
    private app_url: string;
    private route: string;
    private routeFile: string;

    constructor(){
        this.app = express();
        this.port = globalConfig.PORT;
        this.route = '/api/v1';
        this.app_url = globalConfig.APP_URL;
        this.routeFile = '/www/uploads/:fileName';
        this.conexionBD();
        this.middlewares();
        this.routes();
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

    listen(){
        this.app.listen( this.port, ()=>{
            console.log(`Server is online on PORT → ${this.app_url}:${this.port} `)
        })
    }

}
