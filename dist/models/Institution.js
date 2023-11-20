"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Institution = void 0;
const conexion_1 = __importDefault(require("../db/conexion"));
const sequelize_1 = require("sequelize");
const Biometric_1 = require("./Biometric");
const InstitutionShift_1 = require("./InstitutionShift");
exports.Institution = conexion_1.default.define('Institution', {
    // Se definen los atributos de la tabla institución
    modular_code: {
        type: sequelize_1.DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false,
    },
    name_IE: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
    level_modality: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
    dependency_management: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
    address_IE: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    tableName: 'institutions',
    createdAt: true,
    updatedAt: true
});
// relationship with table institution staff
exports.Institution.hasMany(InstitutionShift_1.InstitutionShift);
InstitutionShift_1.InstitutionShift.belongsTo(exports.Institution, {
    foreignKey: 'InstitutionModularCode'
});
// relationship with table institution biometric
exports.Institution.hasMany(Biometric_1.Biometric);
Biometric_1.Biometric.belongsTo(exports.Institution, {
    foreignKey: 'InstitutionModularCode'
});
// `sequelize.define` also returns the model
console.log(exports.Institution === conexion_1.default.models.Institution); // true
//# sourceMappingURL=Institution.js.map