
import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken";
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid';
import { ResponseServer } from '../class/Response';
import { Payload } from '../class/Payload';
import { getPayloadToken } from '../helpers';

const fileSizeMB = 5; //file size in MB
const fileSize = 1000000*fileSizeMB; //file size in bytes

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, 'public/www/uploads')
    },
    filename: function (req, file, cb) {
        const { originalname } = file;
        const extSplit = originalname.split('.');
        const ext = extSplit[extSplit.length - 1];
        cb(null, `${uuidv4()}.${ext}`)
    }
})

export const uploadMulter = multer({ 
    storage,
    limits:{
        fileSize
    },
    fileFilter: (req, file, cb) => {

        const allowedMimes = ['image/jpeg','image/jpg', 'image/png', 'application/pdf'];
        
        if (!allowedMimes.includes(file.mimetype)) {
            return cb(new Error('Error en la subida de archivo. Archivos permitidos (PDF - PNG - JPG)'))
        }
        
        return cb(null, true)
    }
})


// Middleware de manejo de errores específico para Multer
export const multerErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    if(err && err.code=='LIMIT_FILE_SIZE'){
        return res.status(400).json( new ResponseServer(`Error en la subida de archivo. Tamaño de archivo mínimo permitido ${fileSizeMB} MB`, false))
    }

    if(err){
        return res.status(400).json( new ResponseServer(err.message, false))
    }

    next();
};

export const validateAuthorization =  (req:Request, res:Response, next:NextFunction) => {

    try {
        const { authorization } = req.query;
        // verify if exist token 
        if(!authorization){
            return res.status(401).json( new ResponseServer(`En necesario la autorización para mostrar el archivo`, false))
        }
        // validate token with jwt
        getPayloadToken(String(authorization));

        next();

    } catch (e:any) {
        return res.status(500).json( new ResponseServer(`Error de autorización: ${e.message}`, false, null));
    }

}