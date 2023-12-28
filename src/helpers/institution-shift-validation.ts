import { check } from "express-validator";
import { InstitutionShift } from "../models/InstitutionShift";

export const checkIdInstitutionShift = () => {
    return[
        check('id_institution_shift').not()
                     .isEmpty()
                     .withMessage('El id de la institución con turno es requerido')
                     .bail()
                     .custom( existInstitutionIdShift )
    ]
}

export const existInstitutionIdShift = async (id_institution_shift:string) => {

    if(!id_institution_shift){
        throw new Error('El id de la institución con turno es requerido');
    }

    const existIEShift = await InstitutionShift.findOne({
        where:{ id_institution_shift }
    })

    if(!existIEShift){
        throw new Error(`El id de la institución con turno ${id_institution_shift} no se encuentra registrado en el sistema`);
    }

    return true;
}