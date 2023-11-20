import { Router  } from "express";
import { reportController } from "../controllers";
import { verifyError } from "../helpers";
import { haveRole, validateJWT } from "../middlewares";

export const routerReport = Router();

routerReport.get(`/report-counter-information`, validateJWT, haveRole, verifyError, reportController.counterInformation)
routerReport.post(`/detailed-report`, validateJWT, haveRole, verifyError, reportController.getReporteDetallado)
routerReport.post(`/detailed-report-v2`, validateJWT, haveRole, verifyError, reportController.getDetailedReport)