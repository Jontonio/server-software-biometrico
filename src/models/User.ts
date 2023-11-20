import connectDB from '../db/conexion';
import { DataTypes }  from 'sequelize';

export const User = connectDB.define('User', {
  // here define all attributes of table user
  id_user:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  type_id_card:{
    type: DataTypes.STRING(10),
    allowNull:false
  },
  id_card:{
    type: DataTypes.STRING(20),
    unique:true,
    allowNull:false
  },
  names: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  full_name:{
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(80),
    allowNull: false,
    unique: true
  },
  email_verified_at: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  remember_token: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  RoleIdRole: { // foreign key from Roles
    type: DataTypes.INTEGER,
    allowNull: false
  }
},{
  tableName:'users',
  createdAt:true,
  updatedAt:true,
});

// `sequelize.define` also returns the model
console.log(User === connectDB.models.User); // true