import { DataTypes }  from 'sequelize';
import connectDB from '../db/conexion';

export const IEShiftHolyDay = connectDB.define('IEShiftHolyDay', {
  // here define all attributes of the table holy day
  id_ie_shift_holy_day:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  date:{
    type: DataTypes.DATE,
    allowNull: false
  },
  description:{
    type: DataTypes.STRING(400),
    allowNull: true
  },
  status:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  InstitutionShiftIdInstitutionShift:{
    type: DataTypes.INTEGER,
    allowNull:false,
  },
  HolyDayIdHolyDay:{
    type: DataTypes.INTEGER,
    allowNull:false,
  }
}, {
  tableName:'ie_shift_holy_days',
  createdAt:true,
  updatedAt:true,
});

// `sequelize.define` also returns the model
console.log(IEShiftHolyDay === connectDB.models.IEShiftHolyDay); // true
