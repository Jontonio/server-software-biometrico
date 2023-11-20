"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkScheduleInstitution = void 0;
const sequelize_1 = require("sequelize");
const conexion_1 = __importDefault(require("../db/conexion"));
exports.WorkScheduleInstitution = conexion_1.default.define('WorkScheduleInstitution', {
    // Se definen los atributos de la tabla rol
    id_work_schedule_institution: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    day: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    entry_tolerance: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false,
        defaultValue: '00:05:00'
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    WorkScheduleIdWorkSchedule: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    InstitutionStaffIdInstitutionStaff: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'work_schedule_institution',
    createdAt: true,
    updatedAt: true,
});
// `sequelize.define` also returns the model
console.log(exports.WorkScheduleInstitution === conexion_1.default.models.WorkScheduleInstitution); // true
//# sourceMappingURL=WorkScheduleInstitution.js.map