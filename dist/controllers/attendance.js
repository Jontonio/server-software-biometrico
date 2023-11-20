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
exports.registerAttendance = void 0;
const Response_1 = require("../class/Response");
const models_1 = require("../models");
const registerAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get data grom body
        const { body } = req;
        // register new Attendance
        const attendance = yield models_1.Attendance.create(body);
        // return response message
        return res.status(201).json(new Response_1.ResponseServer('Asistencia registrada correctamente', true, attendance));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al registrar asistencia', false, null));
    }
});
exports.registerAttendance = registerAttendance;
//# sourceMappingURL=attendance.js.map