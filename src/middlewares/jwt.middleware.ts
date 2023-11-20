import { NextFunction, Response } from "express";
import { ResponseServer } from "../class/Response";
import { Payload } from "../class/Payload";
import { User } from "../models/User";
import { Role } from "../models/Rol";
import { CustomRequest } from "../utils/customRequest";
import { getPayloadToken } from "../helpers";

export const validateJWT = async (req:CustomRequest | any, res:Response, next:NextFunction) => {
    
    try {
        // get authorization from header
        const { authorization } = req.headers;

        // verify if exist one authorization
        if(!authorization){
            return res.status(401).json( new ResponseServer('Acceso no autorizado, necesario la autorización para realizar acciones en el sistema', false, null))
        }
    
        // get data from payload
        const result:Payload | any = getPayloadToken(String(authorization));

        const { data } = result;

        // verify if exist one use with id
        const user = await User.findOne({
            where:{ 'id_user': data.id_user },
            include:[ Role ],
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
        return res.status(500).json( new ResponseServer(`Error de autorización: ${e.message}`, false, null));
    }

}
