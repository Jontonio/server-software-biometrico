"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const conexion_1 = __importDefault(require("../db/conexion"));
const sequelize_1 = require("sequelize");
exports.User = conexion_1.default.define('User', {
    // here define all attributes of table user
    id_user: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type_id_card: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false
    },
    id_card: {
        type: sequelize_1.DataTypes.STRING(20),
        unique: true,
        allowNull: false
    },
    names: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false
    },
    full_name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(80),
        allowNull: false,
        unique: true
    },
    email_verified_at: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    remember_token: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    RoleIdRole: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'users',
    createdAt: true,
    updatedAt: true,
});
// `sequelize.define` also returns the model
console.log(exports.User === conexion_1.default.models.User); // true
//# sourceMappingURL=User.js.map