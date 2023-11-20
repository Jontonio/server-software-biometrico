import { DataTypes }  from 'sequelize';

import connectDB from '../db/conexion';
import { WorkScheduleInstitution } from './WorkScheduleInstitution';

export const WorkSchedule = connectDB.define('WorkSchedule', {
  // Se definen los atributos de la tabla rol
  id_work_schedule:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  arrival_time:{
    type: DataTypes.TIME,
    allowNull: false
  },
  departure_time:{
    type: DataTypes.TIME,
    allowNull: false
  },
  status:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName:'work_schedule',
  createdAt:true,
  updatedAt:true,
});

// Relationship with table work schedule institution
WorkSchedule.hasMany(WorkScheduleInstitution);
WorkScheduleInstitution.belongsTo(WorkSchedule,{
  foreignKey: 'WorkScheduleIdWorkSchedule'
});

// `sequelize.define` also returns the model
console.log(WorkSchedule === connectDB.models.WorkSchedule); // true
