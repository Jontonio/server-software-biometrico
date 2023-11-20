import connectDB from '../db/conexion';

import { DataTypes }  from 'sequelize';
import { InstitutionStaff } from './InstitutionStaff';
import { Biometric } from './Biometric';
import { InstitutionShift } from './InstitutionShift';

export const Institution = connectDB.define('Institution', {
  // Se definen los atributos de la tabla institución
  modular_code:{
    type: DataTypes.STRING(10),
    primaryKey: true,
    allowNull: false,
  },
  name_IE:{
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  level_modality:{
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  dependency_management:{
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  address_IE:{
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  status:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue:true,
  },
}, {
  tableName:'institutions',
  createdAt:true,
  updatedAt:true
});

// relationship with table institution staff
Institution.hasMany(InstitutionShift);
InstitutionShift.belongsTo(Institution,{
  foreignKey: 'InstitutionModularCode'
});
// relationship with table institution biometric
Institution.hasMany(Biometric);
Biometric.belongsTo(Institution,{
  foreignKey: 'InstitutionModularCode'
});

// `sequelize.define` also returns the model
console.log(Institution === connectDB.models.Institution); // true