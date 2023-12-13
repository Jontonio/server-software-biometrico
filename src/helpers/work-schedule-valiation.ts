import { body, check } from "express-validator"
import { WorkSchedule } from "../models/WorkSchedule";

export const workScheduleValidator = () => {
    return [
        body('arrival_time').not()
              .isEmpty()
              .withMessage('La hora de estrada de trabajo es requerido formato (HH:MM:SS)')
              .bail()
              .custom( (arrival_time:any) => validateTime(arrival_time) ),
        body('departure_time').not()
              .isEmpty()
              .withMessage('La hora de salida de trabajo es requerido formato (HH:MM:SS)')
              .bail()
              .custom( (departure_time:any) => validateTime(departure_time))
    ]
}

export const checkIdWorkSchedule = () => {
  return[
    check('id_work_schedule').not()
                             .isEmpty()
                             .withMessage('El id de horario laboral es requerido')
                             .bail()
                             .custom( existWorkSchedule )
  ]
}

const validateTime = (time:any) => {
    // Use a regular expression to check if the input is a valid time format
    const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
    if (!timeRegex.test(time)) {
      throw new Error('Formato inválido de tiempo. Usar el siguiente formato HH:MM o HH:MM:SS.');
    }
    return true;
}

export const existWorkSchedule = async (id_work_schedule:number) => {
  //verify if id work schedule is no empty 
  if(!id_work_schedule){
    throw new Error('Es necesario el id del horario laboral de trabajo');
  }
  // get one work schedule 
  const workSchedule = await WorkSchedule.findByPk( id_work_schedule );
  //verify if exist one work schedule
  if(!workSchedule){
    throw new Error('El id del horario laboral de trabajo no se encuentra registrado');
  }

  return true;
}