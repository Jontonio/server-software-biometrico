import { body, check } from "express-validator";
import { Shift } from "../models/Shift";
import { InstitutionShift } from "../models/InstitutionShift";

// export const InstitutionShiftValidator = () => {
//     return[
//         body('shift').not()
//                      .isEmpty()
//                      .withMessage('El turno a crear es requerido')
//                      .bail()
//                      .custom( existShift )
//     ]
// }

export const checkIdInstitutionShift = () => {
    return[
        check('id_institution_shift').not()
                     .isEmpty()
                     .withMessage('El id de la institución con turno es requerido')
                     .bail()
                     .custom( existInstitutionIdShift )
    ]
}

const existInstitutionShift = async (shift:string) => {

    if(!shift){
        throw new Error('El turno es requerido');
    }

    const existShift = await Shift.findOne({
        where:{ shift }
    })

    if(existShift){
        throw new Error(`El turno ${shift} ya se encuentra registrado en el sistema`);
    }
    return true;
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