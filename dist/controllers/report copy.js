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
exports.counterInformation = void 0;
const Response_1 = require("../class/Response");
const reports_1 = require("../utils/reports");
const counterInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = [];
        // get information from intitution
        const dataIE = {
            "label": "Institución",
            "countActives": yield (0, reports_1.countInstitution)(true),
            "countInactives": yield (0, reports_1.countInstitution)(false),
            "name": "building",
            "color": "blue"
        };
        // get information from biometric
        const dataBiometric = {
            "label": "Biométrico",
            "countActives": yield (0, reports_1.countBiometrico)(true),
            "countInactives": yield (0, reports_1.countBiometrico)(false),
            "name": "tablet",
            "color": "green"
        };
        // get information from staff
        const dataStaff = {
            "label": "Personal",
            "countActives": yield (0, reports_1.countStaff)(true),
            "countInactives": yield (0, reports_1.countStaff)(false),
            "name": "briefcase",
            "color": "orange",
        };
        // get information from staff
        const dataJustification = {
            "label": "Justificación",
            "countActives": yield (0, reports_1.countJustification)(true),
            "countInactives": yield (0, reports_1.countJustification)(false),
            "name": "folder",
            "color": "indigo",
        };
        list.push(dataIE, dataBiometric, dataStaff, dataJustification);
        // return response message
        return res.status(200).json(new Response_1.ResponseServer('Información registrada en el sistema SIREA', true, list));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al obtener información de counter report', false, null));
    }
});
exports.counterInformation = counterInformation;
//# sourceMappingURL=report%20copy.js.map