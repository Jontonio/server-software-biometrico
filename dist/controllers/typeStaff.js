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
exports.getListTypeStaff = exports.registerTypeStaff = void 0;
const models_1 = require("../models");
const Response_1 = require("../class/Response");
const registerTypeStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get body from request
        const { body } = req;
        // register new type staff
        const institution = yield models_1.TypeStaff.create(body);
        // return response message
        return res.status(201).json(new Response_1.ResponseServer('Tipo de personal creado correctamente', true, institution));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al registrar un tipo de personal', false, null));
    }
});
exports.registerTypeStaff = registerTypeStaff;
const getListTypeStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // find all type staff
        const listTipoPersonal = yield models_1.TypeStaff.findAll({
            where: { 'status': true }
        });
        // return response message
        return res.status(201).json(new Response_1.ResponseServer('Lista de tipos de personal', true, listTipoPersonal, listTipoPersonal.length));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al obtener tipos de personal', false, null));
    }
});
exports.getListTypeStaff = getListTypeStaff;
//# sourceMappingURL=typeStaff.js.map