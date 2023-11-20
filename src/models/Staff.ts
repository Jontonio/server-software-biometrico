import connectDB from '../db/conexion';
import { DataTypes }  from 'sequelize';
import { InstitutionStaff } from './InstitutionStaff';

export const Staff = connectDB.define('Staff', {
  // Se definen los atributos de la tabla personal
  id_card: {
    type: DataTypes.STRING(20),
    allowNull: false,
    primaryKey:true
  },
  type_id_card: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  names: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  first_name: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique:true
  },
  phone_number: {
    type: DataTypes.STRING(9),
    allowNull: false,
  },
  status:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  // Other model options go here
  tableName:'staffs',
  createdAt:true,
  updatedAt:true,
});

// relationship with table institution staff
Staff.hasMany(InstitutionStaff);
InstitutionStaff.belongsTo(Staff,{
  foreignKey: 'StaffIdCard'
});

// `sequelize.define` also returns the model
console.log(Staff === connectDB.models.Staff); // true