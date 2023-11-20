import { Request, Response } from "express";
import { Role } from "../models";
import { ResponseServer } from "../class/Response";

export const getRoles = async ( req:Request, res:Response ) => {
    try {
        // find all roles 
        const roles = await Role.findAll({
            where:{ status: true }
        });
        // return response message
        return res.status(200).json( new ResponseServer('Lista de roles', true, roles, roles.length ))
        
    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al obtener roles', false, null))
    }
}
