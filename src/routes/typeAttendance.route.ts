import { Router  } from "express";
import { verifyError, TypeAttendanceValidator } from "../helpers";
import { typeAttendanceController } from "../controllers";
import { validateJWT } from "../middlewares";

export const routerTypeAttendance = Router();

routerTypeAttendance.post(`/register-type-Attendance`, validateJWT, TypeAttendanceValidator(), verifyError, typeAttendanceController.registerTypeAttendance)