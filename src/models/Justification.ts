import connectDB from '../db/conexion';

import { DataTypes }  from 'sequelize';

export const Justification = connectDB.define('Justification', {
  // Se definen los atributos de la tabla justificación
  id_justification:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  date_justification: {
    type: DataTypes.DATE,
    allowNull: true,
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
  hourStartPer:{
    type: DataTypes.DATE,
    allowNull: true,
  },
  hourFinishPer:{
    type: DataTypes.DATE,
    allowNull: true,
  },
  startDateLincen:{
    type: DataTypes.DATE,
    allowNull: true,
  },
  finishDateLincen:{
    type: DataTypes.DATE,
    allowNull: true,
  },
  InstitutionStaffIdInstitutionStaff:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  TypeJustificationIdTypeJustification:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  StatusJustificationIdStatusJustification:{
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  // Other model options go here
  tableName:'justifications',
  createdAt:true,
  updatedAt:true,
});

// `sequelize.define` also returns the model
console.log(Justification === connectDB.models.Justification); // true