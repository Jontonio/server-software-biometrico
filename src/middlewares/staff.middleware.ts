import { NextFunction, Request, Response } from "express";
import { ResponseServer } from "../class/Response";
import { CustomRequest } from "../utils/customRequest";
import { Staff } from "../models";

export const existStaff = async (req: CustomRequest | any, res:Response, next:NextFunction) => {
    
    try {  
        // verify is exist user on request 
        if(!req.user){
            return res.status(401).json( new ResponseServer(`Error en el servidor al verificar usuario`, false, null));
        }
        // get data from user 
        const { id_card } = req.body;
        
        const staff = await Staff.findByPk( id_card );

        if(staff){
            return res.status(409).json( new ResponseServer(`El personal ${staff.get('names')} ${staff.get('first_name')} ya se encuentra registrado`, false, staff))
        }
        next();

    } catch (e:any) {
        console.log(e)
        return res.status(500).json( new ResponseServer(`Error en el servidor: ${e.message}`, false, null))
    }
}