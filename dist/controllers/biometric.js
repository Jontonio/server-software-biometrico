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
exports.updateBiometric = exports.deleteBiometric = exports.getOneBiometric = exports.getBiometricsFromAnInstitution = exports.registerBiometric = void 0;
const Response_1 = require("../class/Response");
const models_1 = require("../models");
const registerBiometric = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get data grom body
        const { body } = req;
        // register new Attendance
        const biometric = yield models_1.Biometric.create(body);
        // return response message
        return res.status(201).json(new Response_1.ResponseServer('Biométrico registrado correctamente', true, biometric));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al registrar biométrico', false, null));
    }
});
exports.registerBiometric = registerBiometric;
const getBiometricsFromAnInstitution = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { modular_code } = req.params;
        // get list biometrics
        const biometrics = yield models_1.Biometric.findAll({
            where: { InstitutionModularCode: modular_code, status: true }
        });
        // count biometrics
        const countBiometrics = yield models_1.Biometric.count({
            where: { InstitutionModularCode: modular_code, status: true }
        });
        // return response message
        return res.status(200).json(new Response_1.ResponseServer(`Lista de biometricos de la institución con código modular ${modular_code}`, true, biometrics, countBiometrics));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al obtener biométricos de la institución', false, null));
    }
});
exports.getBiometricsFromAnInstitution = getBiometricsFromAnInstitution;
const getOneBiometric = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_biometric } = req.params;
        // get one biometric
        const biometric = yield models_1.Biometric.findOne({
            where: { id_biometric, status: true }
        });
        // return response message
        return res.status(200).json(new Response_1.ResponseServer(`Biométrico con Id ${id_biometric}`, true, biometric));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al obtener el biométrico', false, null));
    }
});
exports.getOneBiometric = getOneBiometric;
const deleteBiometric = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_biometric } = req.params;
        // find biometric
        const biometric = yield models_1.Biometric.findOne({
            where: { id_biometric }
        });
        const respDeleteBiometric = yield (biometric === null || biometric === void 0 ? void 0 : biometric.set({ status: false }).save());
        // return response message
        return res.status(200).json(new Response_1.ResponseServer(`Biométrico eliminado correctamente`, true, respDeleteBiometric));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al eliminar biométrico', false, null));
    }
});
exports.deleteBiometric = deleteBiometric;
const updateBiometric = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_biometric } = req.params;
        const { body } = req;
        // find biometri
        const biometric = yield models_1.Biometric.findOne({
            where: { id_biometric }
        });
        const respUpdateBiometric = yield (biometric === null || biometric === void 0 ? void 0 : biometric.set(body).save());
        // return response message
        return res.status(200).json(new Response_1.ResponseServer(`Biométrico actualizado correctamente`, true, respUpdateBiometric));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al actualizar biométrico', false, null));
    }
});
exports.updateBiometric = updateBiometric;
//# sourceMappingURL=biometric.js.map