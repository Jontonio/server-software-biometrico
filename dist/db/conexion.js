"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../config/config");
const DB_DATABASE = config_1.globalConfig.DB_DATABASE;
const DB_USERNAME = config_1.globalConfig.DB_USERNAME;
const DB_PASSWORD = config_1.globalConfig.DB_PASSWORD;
const connectDB = new sequelize_1.Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false,
});
connectDB.sync().then(() => {
    console.log('Tablas sincronizadas');
}).catch((error) => {
    console.error('Error al sincronizar tablas:', error);
});
exports.default = connectDB;
//# sourceMappingURL=conexion.js.map