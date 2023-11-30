import connectDB from '../db/conexion';
import { DataTypes }  from 'sequelize';
import { Justification } from './Justification';

export const TypeJustification = connectDB.define('TypeJustification', {
  // Se definen los atributos de la tabla justificación
  id_type_justification:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  type_justification: {
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
  tableName:'type_justification',
  createdAt:true,
  updatedAt:true,
});

// relationship with table justification
TypeJustification.hasMany(Justification);
Justification.belongsTo(TypeJustification,{
  foreignKey: 'TypeJustificationIdTypeJustification'
});

// `sequelize.define` also returns the model
console.log(TypeJustification === connectDB.models.TypeJustification); // true