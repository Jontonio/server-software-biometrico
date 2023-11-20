import { Router  } from "express";
import { verifyError } from "../helpers";
import { haveRole, validateJWT } from "../middlewares";
import { shiftController } from "../controllers";
import { checkIdShift, shiftValidator } from "../helpers/shift-validation";

export const routerShift = Router();

routerShift.post('/register-shift', validateJWT, haveRole, shiftValidator(), verifyError, shiftController.registerShift)
routerShift.get('/get-shifts', validateJWT, haveRole, verifyError, shiftController.getShifts)
