import { body } from "express-validator";
import { TypeStaff } from "../models";

export const TypeStaffValidator = () => {

    return [
        body('type_staff').not()
                       .isEmpty()
                       .withMessage('El tipo de personal es requerido')
                       .bail()
                       .isLength({min:3, max:50})
                       .withMessage('El tipo de personal debe ser almenos de 3 dígitos')
    ]
}


export const existIdTypeStaff = async (id_type_staff:number) => {
    // verify if exist id_type_staff
    if(!id_type_staff){
        throw new Error('El id del tipo de personl es requerido');
    }
    // find one user by id_type_staff
    const existsTypeStaff = await TypeStaff.findOne({
        where:{ id_type_staff, status:true }
    });
    // verify if exist type staff 
    if(!existsTypeStaff){
        throw new Error(`El id del tipo de personal ${ id_type_staff } no se encuentra registrado`);
    }

    return true;
}