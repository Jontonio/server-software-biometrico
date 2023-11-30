"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Justification = void 0;
const conexion_1 = __importDefault(require("../db/conexion"));
const sequelize_1 = require("sequelize");
exports.Justification = conexion_1.default.define('Justification', {
    // Se definen los atributos de la tabla justificación
    id_justification: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type_justification: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    date_justification: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    description_justification: {
        type: sequelize_1.DataTypes.STRING(300),
        allowNull: true,
        defaultValue: 'Sin descripción de justificación'
    },
    url_document: {
        type: sequelize_1.DataTypes.STRING(300),
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    InstitutionStaffIdInstitutionStaff: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    // Other model options go here
    tableName: 'justifications',
    createdAt: true,
    updatedAt: true,
});
// `sequelize.define` also returns the model
console.log(exports.Justification === conexion_1.default.models.Justification); // true
//# sourceMappingURL=Justification%20copy.js.map