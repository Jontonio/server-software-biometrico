import { NextFunction, Request, Response } from "express";
import { ResponseServer } from "../class/Response";
import { CustomRequest } from "../utils/customRequest";
import { Role } from "../models/Rol";

export const isAdminRole = (req: CustomRequest | any, res:Response, next:NextFunction) => {
    
    try {  
        // verify is exist user on request 
        if(!req.user){
            return res.status(401).json( new ResponseServer(`Error en el servidor al verificar usuario`, false));
        }
        // get data from user 
        const { Role, names } = req.user;
        const { role } = Role;
        // verify if user is ADMIN ROLE
        if(role != 'ADMIN_ROLE'){
            // return response message
            return res.status(401).json( new ResponseServer(`Operación no autorizada el usuario ${names} no tiene el rol ADMIN_ROLE`, false))
        }
        next();

    } catch (e:any) {
        console.log(e)
        return res.status(500).json( new ResponseServer(`Error en el servidor: ${e.message}`, false))
    }
}

export const haveRole = async (req: CustomRequest | any, res:Response, next:NextFunction) => {

    try {

        // verif if exist user authenticated on request
        if( !req.user ){
            return res.status(401).json( new ResponseServer(`Error en el servidor al verificar usuario`, false, null))
        }
        
        // get all roles from db
        const dataRoles = await Role.findAll({
            where:{ status:true }
        });
        
        // get new array of the roles
        const roles:string[] = dataRoles.map( (value:any) => value.dataValues.role );

        // verify if include role rquest on roles from db
        if( !roles.includes(req.user.Role.role ) ){
            return res.status(401).json( new ResponseServer(`Error en el servidor es necesario estos roles ${ roles }`, false, null))
        }

        // continue if all is correct
        next();

    } catch (e:any) {
        console.log(e)
        return res.status(500).json( new ResponseServer(`Error en el servidor: ${e.message}`, false, null))
    }
}