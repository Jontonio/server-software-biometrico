import { User } from "../models/User";
import { body, check } from "express-validator";
import { existRole } from "./role-validation";

export const userValidator = () => {

    return [
        body('type_id_card').not()
                       .isEmpty()
                       .withMessage('El tipo de documento es requerido')
                       .bail()
                       .isLength({ min:3, max:10 })
                       .withMessage('El tipo de personal debe ser al menos de 3 dígitos')
                       .bail(),
        body('id_card').not()
                    .isEmpty()
                    .withMessage('El documento de identidad es requerido')
                    .bail()
                    .isLength({ min:8, max:20 })
                    .withMessage('El documento de identidad debe ser almenos de 8 dígitos')
                    .bail()
                    .custom( existIdCardUser )
                    .bail(),
        body('names').not()
                    .isEmpty()
                    .withMessage('Los nombres del usuario son requeridos'),
        body('full_name').not()
                    .isEmpty()
                    .withMessage('Los apedllidos del usuario son requeridos')
                    .bail()
                    .isLength({min:4, max:100}),
        body('email').not()
                     .isEmpty()
                     .withMessage('El email del usuario es requerido')
                     .bail()
                     .isEmail()
                     .withMessage("Email inválido del usuario")
                     .bail()
                     .isLength({min:4, max:100})
                     .withMessage("El password deber tener mínimo 4 carácteres y máximo 100 carácteres")
                     .bail()
                     .custom( existEmailUser )
                     .bail(),
        body('RoleIdRole').not()
                        .isEmpty()
                        .withMessage('Es necesario el id Rol (clave foranea)')
                        .bail()
                        .isNumeric()
                        .withMessage('El RoleIdRole tiene que ser númerico')
                        .bail()
                        .custom( existRole )
                        .bail()
    ]
}

export const idValidator = () => {
    return[
        check('id_user').not()
                   .isEmpty()
                   .withMessage("Es necesario un id_usuario del usuario")
                   .bail()
                   .custom( existUser )
    ]
}

export const existIdCardUser = async (id_card:string | number) => {
    // verify if exist id card
    if(!id_card){
        throw new Error(`El DNI del usuario es requerido`);
    }
    // find one user by id_card
    const existsUser = await User.findOne({
        where:{ id_card }
    });
    // verify if exist user 
    if(existsUser){
        throw new Error(`El usuario con el documento de identidad ${ id_card } ya se encuentra registrado`);
    }

    return true;
}

export const existUser = async (id_user:number) => {
    // verify if exist id_user
    if(!id_user){
        throw new Error(`El id_usuario del usuario es requerido`);
    }
    // verify if id_user is not number
    if(isNaN(id_user)){
        throw new Error(`El id ${id_user} tiene que ser un dato numérico`);
    }

    // find one user 
    const existsUser = await User.findByPk(id_user);

    // verify if exsit user
    if(!existsUser){
        throw new Error(`El usuario con el id_user ${id_user} no se encuentra registrado`);
    }
    
    return true;
}


export const existEmailUser = async (email:string) => {
    // find one user by email
    const existsEmail = await User.findOne({ 
        where:{ email }
    });
    // verify if exist one user
    if(existsEmail){
        throw new Error(`El email ${email} del usuario ya registrado`);
    }
    
    return true;
}