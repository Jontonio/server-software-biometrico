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
        const { id_card, email } = req.body;
        
        // find with id card
        const staffWithIdCard = await Staff.findByPk( id_card );

        if(staffWithIdCard){
            const message = `El personal ${staffWithIdCard.get('names')} ${staffWithIdCard.get('first_name')} ya se encuentra registrado con el ${staffWithIdCard.get('type_id_card')} ${staffWithIdCard.get('id_card')}`;
            return res.status(409).json( new ResponseServer( message, false))
        }
        
        // find with email
        const staffWithEmail = await Staff.findOne({
            where:{ email }
        });
        
        if(staffWithEmail){
            const message = `El personal ${staffWithEmail.get('names')} ${staffWithEmail.get('first_name')} ya se encuentra registrado con el email ${staffWithEmail.get('email')}`;
            return res.status(409).json( new ResponseServer(message, false))
        }


        next();

    } catch (e:any) {
        console.log(e)
        return res.status(500).json( new ResponseServer(`Error en el servidor: ${e.message}`, false, null))
    }
}