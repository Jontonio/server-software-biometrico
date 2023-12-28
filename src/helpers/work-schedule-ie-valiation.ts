import { body, check } from "express-validator"
import { existWorkSchedule } from "./work-schedule-valiation";
import { existInstitutionStaff } from "./institution-staff-validation";
import { days } from "../resources/types";
import { WorkScheduleInstitution } from "../models";



export const workScheduleIEValidator = () => {
    return [
        body('day').not()
              .isEmpty()
              .withMessage(`El dia de trabajo es requerido [${days}]`)
              .bail()
              .custom( validateDay ),
        body('entry_tolerance').not()
              .isNumeric()
              .withMessage(`El tiempo de tolerancia de entrada del personal tiene que ser númerico`),
        body('WorkScheduleIdWorkSchedule').not()
              .isEmpty()
              .withMessage(`El Id del horario laboral es requerido`)
              .bail()
              .isNumeric()
              .withMessage(`El Id del horario laboraltiene que ser númerico`)
              .bail()
              .custom ( existWorkSchedule ),
        body('InstitutionStaffIdInstitutionStaff').not()
              .isEmpty()
              .withMessage(`El id del personal en la institución es requerido`)
              .bail()
              .isNumeric()
              .withMessage(`El id del personal en la institucióntiene que ser númerico`)
              .bail()
              .custom( existInstitutionStaff )
    ]
}

export const verifyIdWorkScheduleIE = () => {
      return [
            check('id_work_schedule_institution').not()
                                                .isEmpty()
                                                .withMessage('El id del horario de trabajo del personal es requerido')
                                                .bail()
                                                .custom( existIdWorkSchuleIE )
      ]
}

const existIdWorkSchuleIE = async (id_work_schedule_institution:string) => {

      const existIdWorkSIE = await WorkScheduleInstitution.findOne({
            where:{ id_work_schedule_institution, status:true }
      })

      if(!existIdWorkSIE){
            throw new Error(`El id del horario de trabajo del personal no se encuentra registrado`);
      }

      return true;
}

const validateDay = (day:number) => {

  if(!days.includes(day)){
    throw new Error(`El campo día laboral debe contener uno de los siguiente tipos [${days}]`);
  }

  return true;
}