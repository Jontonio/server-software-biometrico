import { Router  } from "express";
import { haveRole, isAdminRole, validateJWT } from "../middlewares";
import { holyDayController } from '../controllers'
import { checkIdHolyDay, validationAssignHolyDay, validationHolyDay, validationHolyDaysIE } from "../helpers/holy-day-validation";
import { verifyError } from "../helpers";
import { existAssignPrivateHolyDay, existIdHolyDay, existSomeHolyDay } from "../middlewares/holyDay.middleware";

export const routerHolyDay = Router();

routerHolyDay.post('/add-holy-day', 
                    validateJWT, 
                    haveRole, 
                    validationHolyDay(),
                    existSomeHolyDay, 
                    verifyError, 
                    holyDayController.addNewHolyDay )

routerHolyDay.post('/add-holy-days-ie', 
                    validateJWT, 
                    haveRole, 
                    validationHolyDaysIE(),
                    verifyError, 
                    holyDayController.addIEHolyDays )

routerHolyDay.post('/assing-private-holy-day-ie', 
                    validateJWT, 
                    haveRole, 
                    validationAssignHolyDay(),
                    existAssignPrivateHolyDay,
                    verifyError, 
                    holyDayController.assignPrivateHolyDay )

routerHolyDay.get('/get-holy-days', 
                    validateJWT, 
                    haveRole, 
                    verifyError, 
                    holyDayController.getHolyDays )

routerHolyDay.get('/get-one-shift-holy-days/:id_institution_shift', 
                    validateJWT, 
                    haveRole, 
                    verifyError, 
                    holyDayController.getOneIEShiftHolyDays )

routerHolyDay.get('/get-assign-shift-institution-holy-days/:id_institution_shift', 
                    validateJWT, 
                    haveRole, 
                    verifyError, 
                    holyDayController.getAssignEShiftHolyDays )

routerHolyDay.patch('/update-holy-day/:id_holy_day', 
                    validateJWT, 
                    haveRole,
                    checkIdHolyDay(),
                    verifyError, 
                    holyDayController.updateHolyDay )

routerHolyDay.delete('/delete-holy-day/:id_holy_day', 
                    validateJWT, 
                    haveRole,
                    isAdminRole,
                    checkIdHolyDay(),
                    existIdHolyDay,
                    verifyError, 
                    holyDayController.deleteHolyDay )
