"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Staff = void 0;
const conexion_1 = __importDefault(require("../db/conexion"));
const sequelize_1 = require("sequelize");
const InstitutionStaff_1 = require("./InstitutionStaff");
exports.Staff = conexion_1.default.define('Staff', {
    // Se definen los atributos de la tabla personal
    id_card: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true
    },
    type_id_card: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false
    },
    names: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true
    },
    first_name: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    phone_number: {
        type: sequelize_1.DataTypes.STRING(9),
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    // Other model options go here
    tableName: 'staffs',
    createdAt: true,
    updatedAt: true,
});
// relationship with table institution staff
exports.Staff.hasMany(InstitutionStaff_1.InstitutionStaff);
InstitutionStaff_1.InstitutionStaff.belongsTo(exports.Staff, {
    foreignKey: 'StaffIdCard'
});
// `sequelize.define` also returns the model
console.log(exports.Staff === conexion_1.default.models.Staff); // true
//# sourceMappingURL=Staff.js.map