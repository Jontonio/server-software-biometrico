import { NextFunction, Request, Response } from "express";
import { ResponseServer } from "../class/Response";
import { User } from "../models/User";

export const existUsuarioByID = async (req:Request, res:Response, next:NextFunction) =>{
     
    try {
        
        const { id } = req.params;
    
        if( !id ){
            return res.status(500).json( new ResponseServer('El id del usuario es necesario', false, null))
        }
        
        const user = await User.findByPk(id);
        
        if( !user ){
            return res.status(400).json( new ResponseServer(`Usuario con id ${id} no encontrado`, false, null))
        }

        next();
        
    } catch (e) {
        
        console.error(e);
        return res.status(400).json( new ResponseServer(`Usuario no encontrado`, false, null))        
    }

    
}