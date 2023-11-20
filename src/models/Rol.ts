import { DataTypes }  from 'sequelize';

import connectDB from '../db/conexion';
import { User }  from './User';

export const Role = connectDB.define('Role', {
  // here define all attributes of the table role
  id_role:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  role: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
}, {
  tableName:'roles',
  createdAt:true,
  updatedAt:true,
});

// relationship with table user
Role.hasMany(User);
User.belongsTo(Role,{
  foreignKey: 'RoleIdRole'
});

// `sequelize.define` also returns the model
console.log(Role === connectDB.models.Role); // true
