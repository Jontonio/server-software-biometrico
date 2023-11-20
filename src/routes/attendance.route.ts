import { Router  } from "express";
import { verifyError, attendanceValidator } from "../helpers";
import { attendanceController } from "../controllers";

export const routerAttendance = Router();

routerAttendance.post(`/register-Attendance`, attendanceValidator(), verifyError, attendanceController.registerAttendance)
