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
exports.registerTypeAttendance = void 0;
const Response_1 = require("../class/Response");
const models_1 = require("../models");
const registerTypeAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get body from request
        const { body } = req;
        // register new type Attendance
        const typeAttendance = yield models_1.TypeAttendance.create(body);
        // return response message
        return res.status(201).json(new Response_1.ResponseServer('Type Attendance registrada correctamente', true, models_1.TypeAttendance));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al registrar Type Attendance', false, null));
    }
});
exports.registerTypeAttendance = registerTypeAttendance;
//# sourceMappingURL=typeAttendance.js.map