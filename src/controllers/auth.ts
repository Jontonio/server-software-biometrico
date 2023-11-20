import { Request, Response } from "express";
import { ResponseServer } from "../class/Response";
import { generateToken, getPayloadToken, comparePassword, hasPassword } from "../helpers";
import { Data } from "../class/Payload";
import { User, Role } from "../models";

export const login = async (req:Request, res:Response) => {
    try {
        // get data from body
        const { email, password } = req.body;
        // get one user
        const user = await User.findOne({ where:{ email }, include:Role });
        // verify if exist user
        if(!user){
            return res.status(401).json( new ResponseServer('Usuario y/o email inválido', false, null))
        }
        // verify if user is active
        if( !user.dataValues.status ){
            return res.status(401).json( new ResponseServer('El usuario se encuentra inabilitato comuniquese con el administrador', false, null))
        }
        // compare the send password with password db
        const check = await comparePassword(password, user.dataValues.password);
        // verify if the password is match
        if(!check){
            return res.status(401).json( new ResponseServer('Usuario y/o email inválido', false, null))
        }
        // generate data for payload
        const data = new Data(user.dataValues.id_user, user.dataValues.names, user.dataValues.email);
        // generate user token 
        const token = generateToken( data );
        // return response message
        return res.status(200).json( new ResponseServer(`Hola ${user.dataValues.names} bienvenid@ al sistema SIREA`, true,{ token, ...data }))

    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error en login', false, null))
    }
}

export const checkAuth = (req:Request, res:Response) => {
    try {
        // get authorization from headers
        const { authorization } = req.headers;
        // get data from token
        const data = getPayloadToken(authorization!)
        // return response message
        return  res.status(200).json( new ResponseServer(`Usuario autentificado`, true, data))
        
    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error en verificar usuario autentificado', false, null))
    }
}

export const updatePassword = async (req:Request, res:Response) => {
    try {
        // get authorization from headers
        const { currentPassword, newPassword } = req.body;
        const { id_user } = req.params;
        // find user by id
        const user = await User.findOne({
            where:{ id_user }
        });

        const passDB = user?.dataValues.password;

        const resCompare = await comparePassword(currentPassword, passDB)

        if(!resCompare){
            return res.status(404).json( new ResponseServer('La contraseña actual es incorrecta, verifique nuevamente su contraseña', false, null))
        }
        
        const newHashPassword = hasPassword(newPassword);
        await user?.set({ password: newHashPassword }).save();

        return  res.status(200).json( new ResponseServer(`Contraseña actualizada correctamente`, true, null ))
        
    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al actualizar el password', false, null))
    }
}
