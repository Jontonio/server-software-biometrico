"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const sequelize_1 = require("sequelize");
const conexion_1 = __importDefault(require("../db/conexion"));
const User_1 = require("./User");
exports.Role = conexion_1.default.define('Role', {
    // here define all attributes of the table role
    id_role: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    role: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
}, {
    tableName: 'roles',
    createdAt: true,
    updatedAt: true,
});
// relationship with table user
exports.Role.hasMany(User_1.User);
User_1.User.belongsTo(exports.Role, {
    foreignKey: 'RoleIdRole'
});
// `sequelize.define` also returns the model
console.log(exports.Role === conexion_1.default.models.Role); // true
//# sourceMappingURL=Rol.js.map