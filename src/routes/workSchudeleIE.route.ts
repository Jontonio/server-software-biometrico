import { Router  } from "express";
import { verifyError, workScheduleIEValidator } from "../helpers";
import { validateJWT, haveRole } from "../middlewares";
import { workSIEController } from "../controllers";
import { verifyIdWorkScheduleIE } from "../helpers/work-schedule-ie-valiation";

export const routerWorkSchuduleIE = Router();

routerWorkSchuduleIE.post(`/register-work-schedule-ie`, validateJWT, haveRole, workScheduleIEValidator(), verifyError, workSIEController.registerWorkScheduleIE)
routerWorkSchuduleIE.patch(`/update-work-schedule-ie/:id_work_schedule_institution`, validateJWT, haveRole, verifyIdWorkScheduleIE(), verifyError, workSIEController.updateWorkScheduleIE)
routerWorkSchuduleIE.delete(`/delete-work-schedule-ie/:id_work_schedule_institution`, validateJWT, haveRole, verifyIdWorkScheduleIE(), verifyError, workSIEController.deleteWorkScheduleIE)