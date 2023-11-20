"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeStaff = void 0;
const conexion_1 = __importDefault(require("../db/conexion"));
const sequelize_1 = require("sequelize");
const InstitutionStaff_1 = require("./InstitutionStaff");
exports.TypeStaff = conexion_1.default.define('TypeStaff', {
    // Se definen los atributos de la tabla tipo personal
    id_type_staff: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type_staff: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    }
}, {
    tableName: 'type_staffs',
    createdAt: true,
    updatedAt: true
});
// En el modelo TypeStaff
exports.TypeStaff.hasMany(InstitutionStaff_1.InstitutionStaff);
InstitutionStaff_1.InstitutionStaff.belongsTo(exports.TypeStaff, {
    foreignKey: 'TypeStaffIdTypeStaff'
});
// `sequelize.define` also returns the model
console.log(exports.TypeStaff === conexion_1.default.models.TypeStaff); // true
//# sourceMappingURL=TypeStaff.js.map