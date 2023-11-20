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
exports.existRole = void 0;
const Rol_1 = require("../models/Rol");
const existRole = (id_role) => __awaiter(void 0, void 0, void 0, function* () {
    // find one role by primary key
    const existRole = yield Rol_1.Role.findByPk(id_role);
    // verify if exist role
    if (!existRole) {
        throw new Error(`Error al registrar rol del usuario (digíte un rol válido)`);
    }
});
exports.existRole = existRole;
//# sourceMappingURL=role-validation%20copy.js.map