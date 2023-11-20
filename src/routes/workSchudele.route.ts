import { Router  } from "express";
import { verifyError, workScheduleValidator } from "../helpers";
import { validateJWT, haveRole } from "../middlewares";
import { workScheduleController } from "../controllers";

export const routerWorkSchudule = Router();

routerWorkSchudule.post(`/register-work-schedule`, validateJWT, haveRole, workScheduleValidator(), verifyError, workScheduleController.registerWorkSchedule)
routerWorkSchudule.get(`/get-work-schedule`, validateJWT, haveRole, workScheduleController.getWorkSchedule)