import connectDB from '../db/conexion';

import { DataTypes }  from 'sequelize';
import { Attendance } from './Attendance';

export const TypeAttendance = connectDB.define('TypeAttendance', {
  // Se definen los atributos de la tabla tipo asistencia
  id_type_attendance:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  type_attendance:{
    type: DataTypes.STRING(45),
    allowNull: false,
    unique:true
  },
  status:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  // Other model options go here
  tableName:'type_attendances',
  createdAt:true,
  updatedAt:true,
});

// relationship with table Attendance
TypeAttendance.hasMany(Attendance);
Attendance.belongsTo(TypeAttendance,{
  foreignKey: 'TypeAttendanceIdTypeAttendance'
});

// `sequelize.define` also returns the model
console.log(TypeAttendance === connectDB.models.TypeAttendance); // true