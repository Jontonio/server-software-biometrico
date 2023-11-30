import {Request, Response } from "express";
import { ResponseServer } from "../class/Response";
import { globalConfig } from "../config/config";
import { generateToken, hasPassword } from "../helpers";
import { User } from "../models";
import { sendEmailBasic, sendEmailWithTemplate } from "../email/sendGrid";
import { CustomRequest } from "../utils/customRequest";

export const recoveryPassword = async ( req:Request, res:Response) => {
    try {
        const { email } = req.body;
        // generate token
        const payload = { email };

        const tiempoExpiracion = '1h'; // 5 minutos * 60 segundos/minuto
        const token = generateToken( payload, globalConfig.SECRET_KEY_TOKEN_RECOVERY_EMAIL, tiempoExpiracion);
        // actualizamos el campo remember_token
        const user = await User.findOne({ where:{ email } });
        await user?.set({ remember_token:token }).save();
        //send to email
        const data = {
            name: user?.get('names'),
            link:`${globalConfig.APP_URL_FRONT_RECOVERY_PASS}${token}`
        }
        
        const resEmail = await sendEmailWithTemplate(email, 'Recuperar contraseña', 'd-10d3209b0d7b43e5ab23dc1f2195c346', data);

        return res.status(200).json( new ResponseServer('Se envió un email a su cuenta para continuar con el proceso de recuperación de contraseña.', true))

    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al recuperar contraseña', false))
    }
}

export const resetPassword = async ( req:CustomRequest | any, res:Response) => {
    try {
        const { newPassword, credentials } = req.body;
        const { email } = req.user;

        const user = await User.findOne({
            where:{ email, status:true }
        });

        // verify if not exist user
        if(!user){
            return res.status(401).json( new ResponseServer('Acceso no autorizado, necesario la autorización para realizar acciones en el sistema', false));
        }

        if(!user.get('remember_token')){
            return res.status(404).json( new ResponseServer('No existe una autorización de credenciales para realizar el cambio de contraseña', false));
        }

        const newHashPassword = hasPassword(newPassword);
        await user?.set({ password: newHashPassword, remember_token:null }).save();

        return res.status(200).json( new ResponseServer('Contraseña cambiada correctamente', true))

    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al recuperar contraseña', false))
    }
}

export const sendEmailStaff = async ( req:Request, res:Response) => {
    try {
        const { html, email } = req.body;
        const resEmail = await sendEmailBasic(email, 'SIREA - notificación', html);
        const message = `Mensaje enviado correctamente a ${email}`;
        return res.status(200).json( new ResponseServer(message, true))
    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al enviar mensaje', false))
    }
}
