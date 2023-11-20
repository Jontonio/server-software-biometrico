import { DataTypes }  from 'sequelize';

import connectDB from '../db/conexion';

export const WorkScheduleInstitution = connectDB.define('WorkScheduleInstitution', {
  // Se definen los atributos de la tabla rol
  id_work_schedule_institution:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  day:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  entry_tolerance:{
    type: DataTypes.TIME,
    allowNull: false,
    defaultValue: '00:05:00'
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  WorkScheduleIdWorkSchedule:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  InstitutionStaffIdInstitutionStaff:{
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName:'work_schedule_institution',
  createdAt:true,
  updatedAt:true,
});

// `sequelize.define` also returns the model
console.log(WorkScheduleInstitution === connectDB.models.WorkScheduleInstitution); // true
