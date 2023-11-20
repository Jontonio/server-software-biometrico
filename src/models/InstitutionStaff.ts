import connectDB from '../db/conexion';
import { DataTypes }  from 'sequelize';
import { WorkScheduleInstitution } from './WorkScheduleInstitution';
import { Attendance } from './Attendance';
import { Justification } from './Justification';

export const InstitutionStaff = connectDB.define('InstitutionStaff', {
  // Here define all attributes from table intitution staff
  id_institution_staff:{
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
  staff_condition:{
    type:DataTypes.STRING(50),
    allowNull:false
  },
  working_hours:{
    type:DataTypes.INTEGER,
    allowNull:false
  },
  StaffIdCard:{    // foreign key from staff
    type: DataTypes.STRING(20),
    allowNull: false
  },
  TypeStaffIdTypeStaff:{    // foreign key from TypeStaff
    type: DataTypes.INTEGER,
    allowNull: false
  },
  InstitutionShiftIdInstitutionShift:{    // foreign key from TypeStaff
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName:'institution_staff',
  createdAt:true,
  updatedAt:true
});

// Relationship with table work schedule institution
InstitutionStaff.hasMany(WorkScheduleInstitution);
WorkScheduleInstitution.belongsTo(InstitutionStaff,{
  foreignKey: 'InstitutionStaffIdInstitutionStaff'
});

// relationship with table Attendance
InstitutionStaff.hasMany(Attendance);
Attendance.belongsTo(InstitutionStaff,{
  foreignKey: 'InstitutionStaffIdInstitutionStaff'
});

// relationship with table justifications
InstitutionStaff.hasMany(Justification);
Justification.belongsTo(InstitutionStaff,{
  foreignKey: 'InstitutionStaffIdInstitutionStaff'
});


// `sequelize.define` also returns the model
console.log(InstitutionStaff === connectDB.models.InstitutionStaff); // true