import { NextFunction, Request, Response } from "express";
import { ResponseServer } from "../class/Response";
import { CustomRequest } from "../utils/customRequest";
import { InstitutionStaff, Staff } from "../models";

export const existStaffAtTheInstitution = async (req: CustomRequest | any, res:Response, next:NextFunction) => {
    
    try {  
        // verify is exist user on request 
        if(!req.user){
            return res.status(401).json( new ResponseServer(`Error en el servidor al verificar usuario`, false));
        }

        const { id_card, InstitutionShift } = req.body;
        
        const staffAtTheIE = await InstitutionStaff.findOne({
            where:{ StaffIdCard: id_card, 
                    InstitutionShiftIdInstitutionShift: InstitutionShift,
                    status: true }
        });

        if(staffAtTheIE){
            const staff = await Staff.findByPk( id_card );
            return res.status(409).json( new ResponseServer(`El personal ${staff?.get('names')} ${staff?.get('first_name')} ya se encuentra registrado en la institución con el turno`, false, staff))
        }

        next();

    } catch (e:any) {
        console.log(e)
        return res.status(500).json( new ResponseServer(`Error en el servidor: ${e.message}`, false, null))
    }
}