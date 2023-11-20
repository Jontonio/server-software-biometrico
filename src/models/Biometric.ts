import { DataTypes }  from 'sequelize';

import connectDB from '../db/conexion';

export const Biometric = connectDB.define('Biometric', {
  // here define all attributes of the table role
  id_biometric:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  ip_address: {
    type: DataTypes.STRING(18),
    allowNull: false
  },
  subnet_mask:{
    type: DataTypes.STRING(18),
    allowNull: false
  },
  port:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  password:{
    type: DataTypes.STRING(30),
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  InstitutionModularCode:{    // foreign key from insitution
    type: DataTypes.STRING(10),
    allowNull: false
  }
}, {
  tableName:'biometrics',
  createdAt:true,
  updatedAt:true,
});

// `sequelize.define` also returns the model
console.log(Biometric === connectDB.models.Biometric); // true
