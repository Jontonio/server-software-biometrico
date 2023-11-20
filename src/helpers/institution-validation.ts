import { Institution } from "../models/Institution";
import { body, check } from "express-validator";
import { existIdShift } from "./shift-validation";

export const InstitutionValidator = () => {

    return [
        body('modular_code').not()
                       .isEmpty()
                       .withMessage('El código modular es requerido')
                       .bail()
                       .isLength({ min:7, max:7 })
                       .withMessage('El código modular de la institución tiene que ser de 7 dígitos')
                       .bail()
                       .isNumeric()
                       .withMessage('El código modular debe ser númerico')
                       .bail(),
        body('name_IE').not()
                     .isEmpty()
                     .withMessage('El nombre de la institución es requerido')
                     .bail()
                     .isLength({min:3, max:45})
                     .withMessage("El nombre de la institución debe tener mínimo 4 carácteres y máximo 45 carácteres"),
        body('level_modality').not()
                     .isEmpty()
                     .withMessage('El nivel-modalidad de la institución es requerido')
                     .bail()
                     .isLength({ min:4, max:45 })
                     .withMessage("El nivel-modalidad de la institución debe tener mínimo 4 carácteres y máximo 45 carácteres"),
        body('dependency_management').not()
                     .isEmpty()
                     .withMessage('La dependency_management de la institución es requerido')
                     .bail()
                     .isLength({ min:4, max:45 })
                     .withMessage("El nivel-modalidad de la institución debe tener mínimo 4 carácteres y máximo 45 carácteres"),
        body('address_IE').not()
                     .isEmpty()
                     .withMessage('La dirección de de la institución es requerido')
                     .bail()
                     .isLength({ min:4, max:45 })
                     .withMessage("El nivel-modalidad de la institución debe tener mínimo 4 carácteres y máximo 45 carácteres")
                     .bail(),
        body('shift').not()
                     .isEmpty()
                     .withMessage('El turno al que pertenece la institución es requerido')
                     .bail()
                     .isLength({ max:45 })
                     .withMessage("El tunro de la institución debe tener como máximo 45 carácteres")
                     .bail()
                     .custom( (shift) => existIdShift(shift) )

    ]
}


export const modularCodeValidator = () => {
    return[
        check('modular_code').not()
                   .isEmpty()
                   .withMessage("Es necesario el código modular de la institución")
                   .bail()
                   .custom((modular_code) => existInstitution(modular_code, false) )
    ]
}

export const codModularExistListJSON = () => {
    return[
        check('modular_code').not()
                            .isEmpty()
                            .withMessage('El código modular es requerido')
                            .bail()
                            .isLength({min:7, max:7})
                            .withMessage('El código modular de la institución tiene que ser de 7 dígitos')
                            .bail()
                            .isNumeric()
                            .withMessage('El código modular debe ser númerico')
    ]
}



export const existInstitution = async (modular_code:number, isCreated:boolean = true)=>{

    if(!modular_code){
        throw new Error(`El código modular de la institución es requerido`);
    }

    const existsInstitution = await Institution.findOne({
        where:{ modular_code }
    });

    if(existsInstitution && isCreated){
        throw new Error(`El código modular de la institucion ${modular_code} ya se encuentra registrado`);
    }

    if(!existsInstitution && !isCreated){
        throw new Error(`La institución con código modular ${modular_code} no se encuentra registrado `);
    }
}