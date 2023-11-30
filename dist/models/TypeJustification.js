"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeJustification = void 0;
const conexion_1 = __importDefault(require("../db/conexion"));
const sequelize_1 = require("sequelize");
const Justification_1 = require("./Justification");
exports.TypeJustification = conexion_1.default.define('TypeJustification', {
    // Se definen los atributos de la tabla justificación
    id_type_justification: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type_justification: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    // Other model options go here
    tableName: 'type_justification',
    createdAt: true,
    updatedAt: true,
});
// relationship with table justification
exports.TypeJustification.hasMany(Justification_1.Justification);
Justification_1.Justification.belongsTo(exports.TypeJustification, {
    foreignKey: 'TypeJustificationIdTypeJustification'
});
// `sequelize.define` also returns the model
console.log(exports.TypeJustification === conexion_1.default.models.TypeJustification); // true
//# sourceMappingURL=TypeJustification.js.map