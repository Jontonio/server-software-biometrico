import { NextFunction, Response } from "express";
import { ResponseServer } from "../class/Response";
import { Payload } from "../class/Payload";
import { User } from "../models/User";
import { Role } from "../models/Rol";
import { CustomRequest } from "../utils/customRequest";
import { getPayloadToken } from "../helpers";
import { globalConfig } from "../config/config";

export const validateJWT = async (req:CustomRequest | any, res:Response, next:NextFunction) => {
    
    try {
        // get authorization from header
        const { authorization } = req.headers;

        // verify if exist one authorization
        if(!authorization){
            return res.status(401).json( new ResponseServer('Acceso no autorizado, necesario la autorización para realizar acciones en el sistema', false))
        }
    
        // get data from payload
        const result:Payload | any = getPayloadToken(String(authorization), globalConfig.SECRET_KEY_TOKEN_SYSTEM);

        const { data } = result;

        // verify if exist one use with id
        const user = await User.findOne({
            where:{ 'id_user': data.id_user },
            include:[ Role ],
            attributes: { exclude: ['password'] }
        });

        // verify if not exist user
        if(!user){
            return res.status(401).json( new ResponseServer('Acceso no autorizado, necesario la autorización para realizar acciones en el sistema', false));
        }

        req.user = user;

        next();

    } catch (e:any) {
        console.error(e.status);
        if(e.name=='TokenExpiredError'){
            return res.status(500).json( new ResponseServer(`Las crendenciales de acceso al sistema expiraron, inicie sesión nuevamente.`, false));
        }
        return res.status(500).json( new ResponseServer(`Error de autorización: ${e.message}`, false));
    }

}

export const validateJWTChangePassword = async (req:CustomRequest | any, res:Response, next:NextFunction) => {
    
    try {
        // get authorization from header
        const { credentials } = req.body;
        // get data from payload
        const result:Payload | any = getPayloadToken(String(credentials), globalConfig.SECRET_KEY_TOKEN_RECOVERY_EMAIL);

        const { data } = result;

        // verify if exist one use with id
        const user = await User.findOne({
            where:{ email:data.email, status:true },
            attributes: { exclude: ['password'] }
        });

        // verify if not exist user
        if(!user){
            return res.status(401).json( new ResponseServer('Acceso no autorizado, necesario la autorización para realizar acciones en el sistema', false, null));
        }

        req.user = user;

        next();

    } catch (e:any) {
        console.error(e.status);
        if(e.name=='TokenExpiredError'){
            return res.status(401).json( new ResponseServer(`La autorización generada para el cambio de contraseña expiraron, inicie sesión nuevamente.`, false));
        }
        return res.status(500).json( new ResponseServer(`Error de autorización : ${e.message}`, false));
    }

}
