import connectDB from '../db/conexion';
import { DataTypes }  from 'sequelize';
import { InstitutionStaff } from './InstitutionStaff';

export const InstitutionShift = connectDB.define('InstitutionShift', {
  // Here define all attributes from table intitution staff
  id_institution_shift:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement:true
  },
  status:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue:true,
  },
  ShiftIdShift:{ // foreign key from insitution
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  InstitutionModularCode:{    // foreign key from insitution
    type: DataTypes.STRING(10),
    allowNull: false
  },
}, {
  tableName:'institution_shift',
  createdAt:true,
  updatedAt:true
});

// relationship with table institution staff
InstitutionShift.hasMany(InstitutionStaff);
InstitutionStaff.belongsTo(InstitutionShift,{
  foreignKey: 'InstitutionShiftIdInstitutionShift'
});
// `sequelize.define` also returns the model
console.log(InstitutionShift === connectDB.models.InstitutionShift); // true