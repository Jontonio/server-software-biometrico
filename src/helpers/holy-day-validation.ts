import { body, check } from "express-validator";
import { HolyDays } from "../models/HolyDays";
import { existInstitutionIdShift } from "./institution-shift-validation";

export const validationHolyDay = () => {
    return[
        body('name').not()
                    .isEmpty()
                    .withMessage('El nombre del evento es requerido')
                    .bail(),
        body('description')
                    .optional()
                    .bail()
                    .isLength({max:400})
                    .withMessage('La descripción del evento es requerido')
                    .bail(),
        body('isGlobal').not()
                    .isEmpty()
                    .withMessage('Es evento global es requerido')
                    .bail(),
        body('month').optional({values:'null'})
                    .bail()
                    .isNumeric()
                    .withMessage('EL mes del evento tiene que ser númerico')
                    .bail(),
        body('day').optional({values:'null'})
                   .bail()
                   .isNumeric()
                   .withMessage('El dia del evento es requerido')
                   .bail()
    ]
}

export const validationAssignHolyDay = () => {
    return[
        body('HolyDayIdHolyDay').not()
                    .isEmpty()
                    .withMessage('El nombre del evento es requerido')
                    .bail()
                    .custom( existIdHolyDay )
                    .bail(),
        body('InstitutionShiftIdInstitutionShift').not()
                    .isEmpty()
                    .withMessage('El nombre del evento es requerido')
                    .bail()
                    .custom( existInstitutionIdShift )
                    .bail(),
        body('description')
                    .optional({values:'null'})
                    .bail()
                    .isLength({max:400})
                    .withMessage('La descripción del evento es requerido')
                    .bail(),
        body('date').not()
                    .isEmpty()
                    .withMessage("La fecha del evento de la institución a considerar es requerido")
                    .bail()
                    .isISO8601()
                    .withMessage('La fecha debe estar en formato ISO8601')
                    .bail()
    ]
}

export const validationHolyDaysIE = () => {
  return [
    check('holyDays')
      .isArray({ min: 1 })
      .withMessage('Debe proporcionar al menos un arreglo de evento de días')
      .bail(),
    check('holyDays.*.month')
      .not()
      .isEmpty()
      .withMessage('El mes del nuevento es requerido')
      .bail(),
    check('holyDays.*.status')
      .not()
      .isEmpty()
      .withMessage('El estado del evento es requerido')
      .bail(),
    check('holyDays.*.day')
      .not()
      .isEmpty()
      .withMessage('El día del evento es requerido')
      .bail(),
    check('holyDays.*.HolyDayIdHolyDay')
      .not()
      .isEmpty()
      .withMessage('El id del evento es requerido')
      .bail()
      .custom((HolyDayIdHolyDay) => existIdHolyDay(HolyDayIdHolyDay))
      .bail(),
    check('holyDays.*.InstitutionShiftIdInstitutionShift')
      .not()
      .isEmpty()
      .withMessage('El id de la institución con turno es requerido')
      .bail()
      .custom((InstitutionShiftIdInstitutionShift) => existInstitutionIdShift(InstitutionShiftIdInstitutionShift))
      .bail(),
  ];
};

export const checkIdHolyDay = () => {
    return [
        check('id_holy_day').not()
                            .isEmpty()
                            .withMessage('Es necesario el id del evento para actualizar los datos')
    ]
}


const existIdHolyDay = async (id_holy_day:number) => {
    
    if(!id_holy_day){
        throw new Error('Es necesario el id del evento')
    }

    const existType = await HolyDays.findOne({
        where:{ id_holy_day }
    })

    if(!existType){
        throw new Error(`El id ${id_holy_day} del evento no se encuentra registrado`);
    }

    return true;
}
