"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailStaff = exports.resetPassword = exports.recoveryPassword = void 0;
const Response_1 = require("../class/Response");
const config_1 = require("../config/config");
const helpers_1 = require("../helpers");
const models_1 = require("../models");
const sendGrid_1 = require("../email/sendGrid");
const recoveryPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        // generate token
        const payload = { email };
        const tiempoExpiracion = '1h'; // 5 minutos * 60 segundos/minuto
        const token = (0, helpers_1.generateToken)(payload, config_1.globalConfig.SECRET_KEY_TOKEN_RECOVERY_EMAIL, tiempoExpiracion);
        // actualizamos el campo remember_token
        const user = yield models_1.User.findOne({ where: { email } });
        yield (user === null || user === void 0 ? void 0 : user.set({ remember_token: token }).save());
        //send to email
        const data = {
            name: user === null || user === void 0 ? void 0 : user.get('names'),
            link: `${config_1.globalConfig.APP_URL_FRONT_RECOVERY_PASS}${token}`
        };
        const resEmail = yield (0, sendGrid_1.sendEmailWithTemplate)(email, 'Recuperar contraseña', 'd-10d3209b0d7b43e5ab23dc1f2195c346', data);
        return res.status(200).json(new Response_1.ResponseServer('Se envió un email a su cuenta para continuar con el proceso de recuperación de contraseña.', true));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al recuperar contraseña', false));
    }
});
exports.recoveryPassword = recoveryPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { newPassword, credentials } = req.body;
        const { email } = req.user;
        const user = yield models_1.User.findOne({
            where: { email, status: true }
        });
        // verify if not exist user
        if (!user) {
            return res.status(401).json(new Response_1.ResponseServer('Acceso no autorizado, necesario la autorización para realizar acciones en el sistema', false));
        }
        if (!user.get('remember_token')) {
            return res.status(404).json(new Response_1.ResponseServer('No existe una autorización de credenciales para realizar el cambio de contraseña', false));
        }
        const newHashPassword = (0, helpers_1.hasPassword)(newPassword);
        yield (user === null || user === void 0 ? void 0 : user.set({ password: newHashPassword, remember_token: null }).save());
        return res.status(200).json(new Response_1.ResponseServer('Contraseña cambiada correctamente', true));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al recuperar contraseña', false));
    }
});
exports.resetPassword = resetPassword;
const sendEmailStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { html, email } = req.body;
        const resEmail = yield (0, sendGrid_1.sendEmailBasic)(email, 'SIREA - notificación', html);
        const message = `Mensaje enviado correctamente a ${email}`;
        return res.status(200).json(new Response_1.ResponseServer(message, true));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al enviar mensaje', false));
    }
});
exports.sendEmailStaff = sendEmailStaff;
//# sourceMappingURL=email.js.map