import { body, check } from "express-validator";
import { User } from "../models";

const patterPassword = /^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9#$%@!]*$/

export const authValidator = () => {
    return[
        body('email').not()
                     .isEmpty()
                     .withMessage('El email es un campo requerido')
                     .bail()
                     .isEmail()
                     .withMessage("Email inválido"),
        body('password').not()
                        .isEmpty()
                        .withMessage('El password es un campo requerido')
    ]
}

export const authValidatorChangePassword = () => {
    return [
        body('currentPassword').not()
                     .isEmpty()
                     .withMessage('La contraseña actual es requerida')
                     .bail(),
        body('confirmPassword').not()
                        .isEmpty()
                        .withMessage('La contraseña de confirmación es requerida')
                        .bail()
                        .custom((confirmPassword) => validatePassword(confirmPassword)),
        body('newPassword').not()
                        .isEmpty()
                        .withMessage('La contraseña nueva es requerida')
                        .custom((newPassword) => validatePassword(newPassword)),

    ]

}

export const verifyExistIdUser = () => {
    return[
        check('id_user').not()
                        .isEmpty()
                        .withMessage('El id del usuario es requerido')
                        .bail()
                        .custom( existIdUser )
    ]
}

const validatePassword = (pass:string) => {

    if(!pass.match(patterPassword)){
        throw new Error('Las contraseñas no cumples los requisitos de contraseña segura')
    }
    return true;
}
const existIdUser = async (id_user:string) => {

    if(!id_user){
        throw new Error('El id del usuario es requerido');
    }

    const existUser = await User.findOne({
        where:{ id_user, status: true }
    })

    if(!existUser){
        throw new Error(`El usuario con id ${id_user} no se encuentra registrado en el sistema`);
    }
    return true;
}