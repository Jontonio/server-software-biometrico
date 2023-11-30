import { Router  } from "express";
import { verifyError } from "../helpers";
import { haveRole, isAdminRole, validateJWT } from "../middlewares";
import { shiftController } from "../controllers";
import { shiftValidator } from "../helpers/shift-validation";
import { checkIdInstitutionShift } from "../helpers/institution-shift-validation copy";

export const routerShift = Router();

routerShift.post('/register-shift', validateJWT, haveRole, shiftValidator(), verifyError, shiftController.registerShift)
routerShift.get('/get-shifts', validateJWT, haveRole, verifyError, shiftController.getShifts)
routerShift.delete(`/delete-institution-with-shift/:id_institution_shift`, validateJWT, haveRole, isAdminRole, checkIdInstitutionShift(), verifyError, shiftController.deleteInstitutionShift )
