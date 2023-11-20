import { body, check } from "express-validator"
import { existInstitution } from "./institution-validation"
import { existStaff } from "./staff-validation"
import { InstitutionStaff } from "../models/InstitutionStaff"

export const institutionStaffValidator = () => {
    return [
        body('InstitutionModularCode').not()
              .isEmpty()
              .withMessage('El código modular de la institución es requerido')
              .bail()
              .custom( (InstitutionModularCode) => existInstitution(InstitutionModularCode, false )),
        body('StaffIdCard').not()
              .isEmpty()
              .withMessage('El documento de identidad del personal es requerido')
              .bail()
              .custom( (StaffIdCard) => existStaff(StaffIdCard, false ))
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
