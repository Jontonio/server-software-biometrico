import { Router  } from "express";
import { verifyError, workScheduleValidator } from "../helpers";
import { validateJWT, haveRole } from "../middlewares";
import { workScheduleController } from "../controllers";
import { existWorkScheduleTime } from "../middlewares/work-schedule.middleware";

export const routerWorkSchudule = Router();

routerWorkSchudule.post(`/register-work-schedule`, validateJWT, haveRole, workScheduleValidator(), existWorkScheduleTime, verifyError, workScheduleController.registerWorkSchedule)
routerWorkSchudule.get(`/get-work-schedule`, validateJWT, haveRole, workScheduleController.getWorkSchedule)