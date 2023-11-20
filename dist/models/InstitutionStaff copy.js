"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstitutionStaff = void 0;
const conexion_1 = __importDefault(require("../db/conexion"));
const sequelize_1 = require("sequelize");
const WorkScheduleInstitution_1 = require("./WorkScheduleInstitution");
const Attendance_1 = require("./Attendance");
const Justification_1 = require("./Justification");
exports.InstitutionStaff = conexion_1.default.define('InstitutionStaff', {
    // Here define all attributes from table intitution staff
    id_institution_staff: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
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
    StaffIdCard: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    TypeStaffIdTypeStaff: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'institution_staff',
    createdAt: true,
    updatedAt: true
});
// Relationship with table work schedule institution
exports.InstitutionStaff.hasMany(WorkScheduleInstitution_1.WorkScheduleInstitution);
WorkScheduleInstitution_1.WorkScheduleInstitution.belongsTo(exports.InstitutionStaff, {
    foreignKey: 'InstitutionStaffIdInstitutionStaff'
});
// relationship with table Attendance
exports.InstitutionStaff.hasMany(Attendance_1.Attendance);
Attendance_1.Attendance.belongsTo(exports.InstitutionStaff, {
    foreignKey: 'InstitutionStaffIdInstitutionStaff'
});
// relationship with table justifications
exports.InstitutionStaff.hasMany(Justification_1.Justification);
Justification_1.Justification.belongsTo(exports.InstitutionStaff, {
    foreignKey: 'InstitutionStaffIdInstitutionStaff'
});
// `sequelize.define` also returns the model
console.log(exports.InstitutionStaff === conexion_1.default.models.InstitutionStaff); // true
//# sourceMappingURL=InstitutionStaff%20copy.js.map