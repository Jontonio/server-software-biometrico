import { DataTypes }  from 'sequelize';
import connectDB from '../db/conexion';
import { IEShiftHolyDay } from './InstitutionShiftHolyDay';

export const HolyDays = connectDB.define('HolyDays', {
  // here define all attributes of the table holy day
  id_holy_day:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name:{
    type: DataTypes.STRING(45),
    allowNull: false,
    unique:true
  },
  description:{
    type: DataTypes.STRING(400),
    allowNull: true
  },
  isGlobal:{
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  month:{
    type: DataTypes.INTEGER,
    allowNull: true
  },
  day:{
    type: DataTypes.INTEGER,
    allowNull: true
  },
  status:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
}, {
  tableName:'holy_days',
  createdAt:true,
  updatedAt:true,
});

// relationship with table institution IE shift holy day
HolyDays.hasMany(IEShiftHolyDay);
IEShiftHolyDay.belongsTo(HolyDays,{
  foreignKey: 'HolyDayIdHolyDay',
  onDelete: 'RESTRICT',
});
// `sequelize.define` also returns the model
console.log(HolyDays === connectDB.models.HolyDays); // true
