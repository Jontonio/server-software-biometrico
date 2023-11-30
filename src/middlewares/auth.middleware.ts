import { NextFunction, Request, Response } from "express";
import { User } from "../models";
import { ResponseServer } from "../class/Response";

const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9#$%@!]*$/

export const existIdUser = async (id_user:string) => {

    if(!id_user){
        throw new Error('Es necesario el Id del usuario');
    }
    const user = await User.findOne({
        where:{ id_user, status:true }
    })
    if(!user){
        throw new Error(`El usuario con Id ${id_user} no se encuentra registrado en el sistema`);
    }
    return true;
}

export const verifyChangeEmailUser = async (req:Request, res:Response, next:NextFunction) => {

    const { email } = req.body;

    if(!email){
        return res.status(400).json( new ResponseServer(`Es necesario el email del usuario`, false))
    }
    
    const user = await User.findOne({
        where:{ email }
    })
    
    if(!user){
        return res.status(404).json( new ResponseServer(`El email ${email} no se encuentra registrado`, false))
    }
    
    if(!user.get('status')){
        return res.status(401).json( new ResponseServer(`El email ${email} no se encuentra registrado, comuniquese con el administrador del sistema`, false))
    }

    next();
}

export const passwordPatternValidation = (password:string) => {
    // match with ex with pattern password
    if(!password.match(passwordPattern)){
        throw new Error('La contraseñas nuevas no cumplen con los requisitos de contraseña segura');
    }
    return true
}

export const comparePassword = async (req:Request, res:Response, next:NextFunction) => {

    const { newPassword, confirmPassword } = req.body;
    
    if(newPassword!==confirmPassword){
        return res.status(400).json( new ResponseServer(`Las contraseñas nuevas no coinciden, verifique nuevamente`, false))
    }

    next();
}   