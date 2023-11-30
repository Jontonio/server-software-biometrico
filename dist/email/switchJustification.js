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
exports.switchStatusJustificationEmail = void 0;
const sendGrid_1 = require("./sendGrid");
const switchStatusJustificationEmail = (status_justification, data) => __awaiter(void 0, void 0, void 0, function* () {
    const { InstitutionStaff, TypeJustification, date_justification, createdAt } = data;
    const dataEmail = {
        name: InstitutionStaff.Staff.names,
        justifyType: TypeJustification.type_justification,
        justifyDate: date_justification,
        justifyCreated: createdAt
    };
    const template = switchTemplate(status_justification);
    yield (0, sendGrid_1.sendEmailWithTemplate)(InstitutionStaff.Staff.email, 'prueba', template, dataEmail);
});
exports.switchStatusJustificationEmail = switchStatusJustificationEmail;
const switchTemplate = (status_justification) => {
    let id_template = '';
    switch (status_justification) {
        case 'ENVIADO':
            id_template = 'd-6ad08d0631d148c1a69163a42062a8e4';
            break;
        case 'EN PROGRESO':
            id_template = 'd-15b06fc6f86a43f5aa3d383630170937';
            break;
        case 'ACEPTADO':
            id_template = 'd-aeefb25774e34bfeb81e014059d4ab2d';
            break;
        case 'RECHAZADO':
            id_template = 'd-3952f78a8d6842d3a3d576563745d07c';
            break;
        default:
            break;
    }
    return id_template;
};
//# sourceMappingURL=switchJustification.js.map