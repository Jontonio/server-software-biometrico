"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstitutionShift = void 0;
const conexion_1 = __importDefault(require("../db/conexion"));
const sequelize_1 = require("sequelize");
const InstitutionStaff_1 = require("./InstitutionStaff");
exports.InstitutionShift = conexion_1.default.define('InstitutionShift', {
    // Here define all attributes from table intitution staff
    id_institution_shift: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    turno: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    InstitutionModularCode: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false
    },
}, {
    tableName: 'institution_shift',
    createdAt: true,
    updatedAt: true
});
// relationship with table institution staff
exports.InstitutionShift.hasMany(InstitutionStaff_1.InstitutionStaff);
InstitutionStaff_1.InstitutionStaff.belongsTo(exports.InstitutionShift, {
    foreignKey: 'IdInstitutionShift'
});
// `sequelize.define` also returns the model
console.log(exports.InstitutionShift === conexion_1.default.models.InstitutionShift); // true
//# sourceMappingURL=InstitutionShift%20copy.js.map