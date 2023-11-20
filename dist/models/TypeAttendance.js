"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeAttendance = void 0;
const conexion_1 = __importDefault(require("../db/conexion"));
const sequelize_1 = require("sequelize");
const Attendance_1 = require("./Attendance");
exports.TypeAttendance = conexion_1.default.define('TypeAttendance', {
    // Se definen los atributos de la tabla tipo asistencia
    id_type_attendance: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type_attendance: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
        unique: true
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    // Other model options go here
    tableName: 'type_attendances',
    createdAt: true,
    updatedAt: true,
});
// relationship with table Attendance
exports.TypeAttendance.hasMany(Attendance_1.Attendance);
Attendance_1.Attendance.belongsTo(exports.TypeAttendance, {
    foreignKey: 'TypeAttendanceIdTypeAttendance'
});
// `sequelize.define` also returns the model
console.log(exports.TypeAttendance === conexion_1.default.models.TypeAttendance); // true
//# sourceMappingURL=TypeAttendance.js.map