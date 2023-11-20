"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Biometric = void 0;
const sequelize_1 = require("sequelize");
const conexion_1 = __importDefault(require("../db/conexion"));
exports.Biometric = conexion_1.default.define('Biometric', {
    // here define all attributes of the table role
    id_biometric: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ip_address: {
        type: sequelize_1.DataTypes.STRING(18),
        allowNull: false
    },
    subnet_mask: {
        type: sequelize_1.DataTypes.STRING(18),
        allowNull: false
    },
    port: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    InstitutionModularCode: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false
    }
}, {
    tableName: 'biometrics',
    createdAt: true,
    updatedAt: true,
});
// `sequelize.define` also returns the model
console.log(exports.Biometric === conexion_1.default.models.Biometric); // true
//# sourceMappingURL=Biometric.js.map