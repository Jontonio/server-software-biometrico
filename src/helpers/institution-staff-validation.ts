import { body, check } from "express-validator"
import { existStaff } from "./staff-validation"
import { InstitutionStaff } from "../models/InstitutionStaff"
import { existInstitutionIdShift } from "./institution-shift-validation copy"
import { existIdTypeStaff } from "./type-staff-validation"

export const institutionStaffValidator = () => {
    return [
      body('staff_condition').not()
                        .isEmpty()
                        .withMessage('La condición del personal es requerido')
                        .bail(),
      body('working_hours').not()
                    .isEmpty()
                    .withMessage('La jornada laboral del personal es requerido')
                    .bail()
                    .isNumeric()
                    .withMessage('La joranda laboral del personal deber ser númerico')
                    .bail(),
      body('InstitutionShiftIdInstitutionShift').not()
                    .isEmpty()
                    .withMessage('El id de la institución en turno es requerido')
                    .bail()
                    .custom((InstitutionShiftIdInstitutionShift) => existInstitutionIdShift(InstitutionShiftIdInstitutionShift))
                    .bail(),
      body('StaffIdCard').not()
            .isEmpty()
            .withMessage('El documento de identidad es requerido')
            .bail()
            .isLength({ min:8, max:20 })
            .withMessage('El documento de identidad debe ser almenos de 8 dígitos')
            .custom( (StaffIdCard) => existStaff(StaffIdCard, false )),
      body('TypeStaffIdTypeStaff').not()
            .isEmpty()
            .withMessage('El id del tipo de personal es requerido')
            .bail()
            .custom((TypeStaff) => existIdTypeStaff(TypeStaff))
            .bail(),
    ]
}

export const institutionStaffUpdateValidator = () => {
    return [
      body('staff_condition').not()
                        .isEmpty()
                        .withMessage('La condición del personal es requerido')
                        .bail(),
      body('working_hours').not()
                    .isEmpty()
                    .withMessage('La jornada laboral del personal es requerido')
                    .bail()
                    .isNumeric()
                    .withMessage('La joranda laboral del personal deber ser númerico')
                    .bail(),
      body('TypeStaffIdTypeStaff').not()
            .isEmpty()
            .withMessage('El id del tipo de personal es requerido')
            .bail()
            .custom((TypeStaff) => existIdTypeStaff(TypeStaff))
            .bail(),
    ]
}

export const checkIdInstitutionStaff = () => {
  return [
    check('id_institution_staff').not()
                                 .isEmpty()
                                 .withMessage('El id del personal en la institución es requerido.')
                                 .bail()
                                 .custom( existInstitutionStaff )
  ]
}

export const  existInstitutionStaff = async (id_institution_staff:string) => {
    //verify if id institution staff
  if(!id_institution_staff){
    throw new Error('Es necesario el id del personal en la institución asignada');
  }
  // get one staff at the institution
  const institutionStaff = await InstitutionStaff.findByPk( id_institution_staff );
  //verify if exist one staff at the institution
  if(!institutionStaff){
    throw new Error('El id del personal en la institución no se encuentra registrado');
  }

  return true;
  
}
