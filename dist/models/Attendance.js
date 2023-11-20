"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attendance = void 0;
const conexion_1 = __importDefault(require("../db/conexion"));
const sequelize_1 = require("sequelize");
exports.Attendance = conexion_1.default.define('Attendance', {
    // Se definen los atributos de la tabla asistencia
    id_attendance: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    date_time: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    punch: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true
    },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    InstitutionStaffIdInstitutionStaff: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    TypeAttendanceIdTypeAttendance: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    // Other model options go here
    tableName: 'attendances',
    createdAt: true,
    updatedAt: true,
});
// `sequelize.define` also returns the model
console.log(exports.Attendance === conexion_1.default.models.Attendance); // true
//# sourceMappingURL=Attendance.js.map