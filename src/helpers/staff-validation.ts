import { Request } from "express";
import { Staff } from "../models/Staff";
import { body, check } from "express-validator";
import { existInstitution } from "./institution-validation";
import { existInstitutionStaff } from "./institution-staff-validation";
import { existInstitutionIdShift } from "./institution-shift-validation copy";
import { existIdTypeStaff } from "./type-staff-validation";

export const staffValidator = () => {

    return [
        body('type_id_card').not()
                       .isEmpty()
                       .withMessage('El tipo de documento es requerido')
                       .bail()
                       .isLength({min:3, max:10})
                       .withMessage('El tipo de personal debe ser almenos de 3 dígitos'),
        body('id_card').not()
                       .isEmpty()
                       .withMessage('El documento de identidad es requerido')
                       .bail()
                       .isLength({min:8, max:20})
                       .withMessage('El documento de identidad debe ser almenos de 8 dígitos'),
        body('names').not()
                       .isEmpty()
                       .withMessage('Los nombres del personal es requerido')
                       .bail()
                       .isLength({max:45})
                       .withMessage('Los nombres del personal debe ser como máximo de 45 carácteres'),
        body('first_name').not()
                       .isEmpty()
                       .withMessage('El apellido paterno del personal es requerido')
                       .bail()
                       .isLength({max:45})
                       .withMessage('El apellido paterno del personal debe ser como máximo de 45 carácteres'),
        body('last_name').not()
                       .isEmpty()
                       .withMessage('El apellido materno del personal es requerido')
                       .bail()
                       .isLength({max:45})
                       .withMessage('El apellido materno del personal debe ser como máximo de 45 carácteres'),
        body('email').not()
                       .isEmpty()
                       .withMessage('El email del personal es requerido')
                       .bail()
                       .isLength({max:100})
                       .withMessage('El email del personal debe ser como máximo de 100 carácteres')
                       .bail()
                       .isEmail()
                       .withMessage('El email del personal debe ser válido')
                       .bail()
                       .custom((email) => existEmail(email, false) )
                       .bail(),
        body('phone_numer').optional()
                       .isLength({max:9})
                       .withMessage('El celular del personal debe ser 9 dígitos númericos'),
        body('staff_condition').not()
                    .isEmpty()
                    .withMessage('La condición del personal es requerido')
                    .bail(),
        body('working_hours').not()
                    .isEmpty()
                    .withMessage('La jornada laboral del personal es requerido')
                    .bail()
                    .isNumeric()
                    .withMessage('La joranda laboral del personal deber ser númerico')
                    .bail(),
        body('TypeStaff').not()
                            .isEmpty()
                            .withMessage('El id del tipo de personal es requerido')
                            .bail()
                            .custom((TypeStaff) => existIdTypeStaff(TypeStaff))
                            .bail(),
        body('InstitutionShift').not()
                            .isEmpty()
                            .withMessage('El id de la institución en turno es requerido')
                            .bail()
                            .custom((InstitutionShift) => existInstitutionIdShift(InstitutionShift))
                            .bail()
    ]
}

export const idCardValidatorAPI = () => {

    return [
        body('id_card').not()
                       .isEmpty()
                       .withMessage('El DNI es requerido')
                       .bail()
                       .isLength({min:8, max:8})
                       .withMessage('El DNI debe ser de 8 dígitos')
    ]
}

export const idCardValidator = () => {
    return[
        check('id_card').not()
                        .isEmpty()
                        .withMessage("Es necesario el documento del personal")
                        .bail()
                        .isLength({min:8, max:20})
                        .withMessage('El documento de identidad debe ser almenos de 8 dígitos y máximo de 20 dígitos')
                        .bail()
                        .custom((id_card) => existStaff(id_card, false))
    ]
}

export const attendanceOnePersonalValidator = () => {
    return [
        body('id_institution_staff').not()
                       .isEmpty()
                       .withMessage('El id del personal en la institución es requerido')
                       .bail()
                       .custom( existInstitutionStaff ),
        body('id_institution_shift').not()
                       .isEmpty()
                       .withMessage('El id de la institución con turno es requerido')
                       .bail()
                       .custom( existInstitutionIdShift ),
        body('year').not()
                    .isEmpty()
                    .withMessage('El parámetro año es requerido')
                    .bail()
                    .isNumeric()
                    .withMessage('El parámetro año tiene que ser númerico'),
        body('month').not()
                    .isEmpty()
                    .withMessage('El parámetro mes es requerido')
                    .bail()
                    .isNumeric()
                    .withMessage('El parámetro mes tiene que ser númerico')

    ]
}

const checkBody = (req:Request | any) => {   

    if (Object.keys(req.body).length === 0) {
        throw new Error('El cuerpo de la solicitud está vacío');
    }

}

export const existStaff = async (id_card:string, isRegister:boolean)=>{

    const existStaff = await Staff.findByPk(id_card);

    if(existStaff && isRegister){
        throw new Error(`El personal con documento ${id_card} ya se encuentra registrado`);
    }
  
    if(!existStaff && !isRegister){
        throw new Error(`El personal con documento ${id_card} no se encuentra registrado`);
    }

    return true;
}

export const existEmail = async (email:string, isRegister:boolean)=>{

    const existStaff = await Staff.findOne({
        where:{ email }
    });

    if(existStaff && isRegister){
        throw new Error(`El personal con el email ${email} ya se encuentra registrado`);
    }

    return true;
}

