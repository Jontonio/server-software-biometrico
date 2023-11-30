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
exports.existStaff = void 0;
const Response_1 = require("../class/Response");
const models_1 = require("../models");
const existStaff = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // verify is exist user on request 
        if (!req.user) {
            return res.status(401).json(new Response_1.ResponseServer(`Error en el servidor al verificar usuario`, false, null));
        }
        // get data from user 
        const { id_card, email } = req.body;
        // find with id card
        const staffWithIdCard = yield models_1.Staff.findByPk(id_card);
        if (staffWithIdCard) {
            const message = `El personal ${staffWithIdCard.get('names')} ${staffWithIdCard.get('first_name')} ya se encuentra registrado con el ${staffWithIdCard.get('type_id_card')} ${staffWithIdCard.get('id_card')}`;
            return res.status(409).json(new Response_1.ResponseServer(message, false));
        }
        // find with email
        const staffWithEmail = yield models_1.Staff.findOne({
            where: { email }
        });
        if (staffWithEmail) {
            const message = `El personal ${staffWithEmail.get('names')} ${staffWithEmail.get('first_name')} ya se encuentra registrado con el email ${staffWithEmail.get('email')}`;
            return res.status(409).json(new Response_1.ResponseServer(message, false));
        }
        next();
    }
    catch (e) {
        console.log(e);
        return res.status(500).json(new Response_1.ResponseServer(`Error en el servidor: ${e.message}`, false, null));
    }
});
exports.existStaff = existStaff;
//# sourceMappingURL=staff.middleware.js.map