import connectDB from '../db/conexion';
import { DataTypes }  from 'sequelize';
import { Justification } from './Justification';

export const StatusJustification = connectDB.define('StatusJustification', {
  // Se definen los atributos de la tabla justificación
  id_status_justification:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  status_justification: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  status:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  // Other model options go here
  tableName:'status_justification',
  createdAt:true,
  updatedAt:true,
});

// relationship with table justification
StatusJustification.hasMany(Justification);
Justification.belongsTo(StatusJustification,{
  foreignKey: 'StatusJustificationIdStatusJustification'
});

// `sequelize.define` also returns the model
console.log(StatusJustification === connectDB.models.StatusJustification); // true