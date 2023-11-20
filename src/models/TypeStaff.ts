
import connectDB from '../db/conexion';
import { DataTypes }  from 'sequelize';
import { Staff } from './Staff';
import { InstitutionStaff } from './InstitutionStaff';

export const TypeStaff = connectDB.define('TypeStaff', {
  // Se definen los atributos de la tabla tipo personal
  id_type_staff:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  type_staff:{
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  status:{
    type: DataTypes.BOOLEAN,
    defaultValue:true,
    allowNull: false,
  }
}, {
  tableName:'type_staffs',
  createdAt:true,
  updatedAt:true
});

// En el modelo TypeStaff
TypeStaff.hasMany(InstitutionStaff);
InstitutionStaff.belongsTo(TypeStaff,{
  foreignKey: 'TypeStaffIdTypeStaff'
});

// `sequelize.define` also returns the model
console.log(TypeStaff === connectDB.models.TypeStaff); // true