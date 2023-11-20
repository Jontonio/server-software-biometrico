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
exports.countJustification = exports.countStaff = exports.countBiometrico = exports.countInstitution = void 0;
const models_1 = require("../models");
const countInstitution = (status) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Institution.count({ where: { status } });
});
exports.countInstitution = countInstitution;
const countBiometrico = (status) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Biometric.count({ where: { status } });
});
exports.countBiometrico = countBiometrico;
const countStaff = (status) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Staff.count({ where: { status } });
});
exports.countStaff = countStaff;
const countJustification = (status) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Justification.count({ where: { status } });
});
exports.countJustification = countJustification;
//# sourceMappingURL=reports.js.map