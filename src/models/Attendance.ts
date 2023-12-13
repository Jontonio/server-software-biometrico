import connectDB from '../db/conexion';

import { DataTypes }  from 'sequelize';

export const Attendance = connectDB.define('Attendance', {
  // Se definen los atributos de la tabla asistencia
  id_attendance:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  date_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  punch: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  active:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  InstitutionStaffIdInstitutionStaff:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  TypeAttendanceIdTypeAttendance:{
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  // Other model options go here
  tableName:'attendances',
  createdAt:true,
  updatedAt:true,
});


// `sequelize.define` also returns the model
console.log(Attendance === connectDB.models.Attendance); // true