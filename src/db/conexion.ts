
import { Sequelize } from 'sequelize';
import { globalConfig } from '../config/config';

const DB_DATABASE = globalConfig.DB_DATABASE;
const DB_USERNAME = globalConfig.DB_USERNAME;
const DB_PASSWORD = globalConfig.DB_PASSWORD;

const connectDB = new Sequelize( DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false,
});

connectDB.sync().then(() => {
    console.log('Tablas sincronizadas');
}).catch((error) => {
    console.error('Error al sincronizar tablas:', error);
});

export default connectDB;
