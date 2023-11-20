import connectDB from '../db/conexion';

import { DataTypes }  from 'sequelize';

export const Justification = connectDB.define('Justification', {
  // Se definen los atributos de la tabla justificación
  id_justification:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  type_justification: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  date_justification: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  description_justification: {
    type: DataTypes.STRING(300),
    allowNull: true,
    defaultValue:'Sin descripción de justificación'
  },
  url_document: {
    type: DataTypes.STRING(300),
    allowNull: false,
  },
  status:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  InstitutionStaffIdInstitutionStaff:{
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  // Other model options go here
  tableName:'justifications',
  createdAt:true,
  updatedAt:true,
});

// `sequelize.define` also returns the model
console.log(Justification === connectDB.models.Justification); // true