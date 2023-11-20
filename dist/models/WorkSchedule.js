"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkSchedule = void 0;
const sequelize_1 = require("sequelize");
const conexion_1 = __importDefault(require("../db/conexion"));
const WorkScheduleInstitution_1 = require("./WorkScheduleInstitution");
exports.WorkSchedule = conexion_1.default.define('WorkSchedule', {
    // Se definen los atributos de la tabla rol
    id_work_schedule: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    arrival_time: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false
    },
    departure_time: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'work_schedule',
    createdAt: true,
    updatedAt: true,
});
// Relationship with table work schedule institution
exports.WorkSchedule.hasMany(WorkScheduleInstitution_1.WorkScheduleInstitution);
WorkScheduleInstitution_1.WorkScheduleInstitution.belongsTo(exports.WorkSchedule, {
    foreignKey: 'WorkScheduleIdWorkSchedule'
});
// `sequelize.define` also returns the model
console.log(exports.WorkSchedule === conexion_1.default.models.WorkSchedule); // true
//# sourceMappingURL=WorkSchedule.js.map