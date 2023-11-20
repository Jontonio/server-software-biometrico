import connectDB from '../db/conexion';
import { DataTypes }  from 'sequelize';
import { InstitutionShift } from './InstitutionShift';

export const Shift = connectDB.define('Shift', {
  // Here define all attributes from table intitution staff
  id_shift:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement:true
  },
  shift:{
    type: DataTypes.STRING(45),
    allowNull: false,
    unique:true,
  },
  status:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue:true,
  }
}, {
  tableName:'shifts',
  createdAt:true,
  updatedAt:true
});

// relationship with table institution staff
Shift.hasMany(InstitutionShift);
InstitutionShift.belongsTo(Shift,{
  foreignKey: 'ShiftIdShift'
});
// `sequelize.define` also returns the model
console.log(Shift === connectDB.models.Shift); // true