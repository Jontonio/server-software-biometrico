import { body, check } from "express-validator"
import { existInstitution } from "./institution-validation";
import { Biometric } from "../models/Biometric";

const ipv4Pattern = /^\b(?:\d{1,3}\.){3}\d{1,3}\b$/;

export const biometricValidator = () => {
    
    return[
        body('ip_address').not()
                .isEmpty()
                .withMessage('El ip del dispositivo es requerido')
                .bail()
                .isLength({max:18})
                .withMessage('El ip del disposito debe tener como máximo 18 caracteres')
                .bail()
                .custom( ipv4Validation )
                .bail(),
        body('subnet_mask').not()
                .isEmpty()
                .withMessage('La máscara de subered del dispositivo es requerido')
                .bail()
                .isLength({max:18})
                .withMessage('La máscara de subered del disposito debe tener como máximo 18 caracteres')
                .bail()
                .custom( ipv4Validation )
                .bail(),
        body('port').not()
                .isEmpty()
                .withMessage('El puerto del dispostivo es requerido')
                .bail()
                .isNumeric()
                .withMessage('El puerto del dispositivo tiene que ser númerico')
                .bail(),
        body('password').not()
                    .isEmpty()
                    .withMessage('El password del dispositivo es requerido')
                    .bail()
                    .isNumeric()
                    .withMessage('El password del dispositivoes requerido')
                    .bail(),
        body('InstitutionModularCode').not()
                    .isEmpty()
                    .withMessage('El Id InstitutionModularCode de la institución es requerida (foreign key)')
                    .bail()
                    .custom((InstitutionModularCode)=> existInstitution(InstitutionModularCode, false))
    ]
}

export const checkIdBiometric = () => {
    return [
        check('id_biometric').not()
                            .isEmpty()
                            .withMessage('El id del biométrico es requerido')
                            .bail()
                            .custom( existBiometric )
                            .bail()
    ]
}

const existBiometric = async (id_biometric:number) => {

    if(!id_biometric){
        throw new Error('Es necesario el id del biométrico');
    }
    
    const biometric = await Biometric.findOne({
        where:{ id_biometric }
    });

    if(!biometric){
        throw new Error(`El biométrico con id ${id_biometric} no se encuentra registrado`);
    }

    return true;
}

const ipv4Validation = (ip_address:string) => {
    // match with ex with ip
    if(!ip_address.match(ipv4Pattern)){
        throw new Error('La ip del dispositivo digita no es válida');
    }
    
    return true
}