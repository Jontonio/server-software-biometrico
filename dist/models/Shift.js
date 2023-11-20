"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shift = void 0;
const conexion_1 = __importDefault(require("../db/conexion"));
const sequelize_1 = require("sequelize");
const InstitutionShift_1 = require("./InstitutionShift");
exports.Shift = conexion_1.default.define('Shift', {
    // Here define all attributes from table intitution staff
    id_shift: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    shift: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
        unique: true,
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }
}, {
    tableName: 'shifts',
    createdAt: true,
    updatedAt: true
});
// relationship with table institution staff
exports.Shift.hasMany(InstitutionShift_1.InstitutionShift);
InstitutionShift_1.InstitutionShift.belongsTo(exports.Shift, {
    foreignKey: 'ShiftIdShift'
});
// `sequelize.define` also returns the model
console.log(exports.Shift === conexion_1.default.models.Shift); // true
//# sourceMappingURL=Shift.js.map