import { body } from "express-validator";
import { TypeAttendance } from "../models/TypeAttendance";
import { existInstitutionStaff } from "./institution-staff-validation";

export const attendanceValidator = () => {

    return [
        body('date_time').not()
                       .isEmpty()
                       .withMessage('La fechaHora es requerido')
                       .bail()
                       .isISO8601()
                       .withMessage('La fechaHora debe estar en formato ISO8601 (YYYY-MM-DDTHH:mm:ss)'),
        body('status').not()
                       .isEmpty()
                       .withMessage('El status es requerido'),
        body('punch').not()
                       .isEmpty()
                       .withMessage('El punch es requerido'),
        body('InstitutionStaffIdInstitutionStaff').not()
                       .isEmpty()
                       .withMessage('El id del personal en la institución es requerido (llave foranea)')
                       .bail()
                       .isNumeric()
                       .withMessage('El id del personal en la institución debe ser númerico (llave foranea)')
                       .bail()
                       .custom((InstitutionStaffIdInstitutionStaff) => existInstitutionStaff(InstitutionStaffIdInstitutionStaff)),
        body('TypeAttendanceIdTypeAttendance').not()
                       .isEmpty()
                       .withMessage('El TypeAttendanceIdTypeAttendance es requerido')
                       .bail()
                       .isNumeric()
                       .withMessage('El id TypeAttendanceIdTypeAttendance debe ser númerico (llave foranea)')
                       .bail()
                       .custom( existTypeAttendance )
    ]
}

export const existTypeAttendance = async (id_type_attendance:string)=>{

    const existTypeAttendance = await TypeAttendance.findByPk(id_type_attendance);

    if(!existTypeAttendance){
        throw new Error(`No se encuentra el type Attendance ${id_type_attendance} registrado`);
    }
    
    return true;
}   

