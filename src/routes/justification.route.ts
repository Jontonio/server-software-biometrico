import { Router  } from "express";
import { verifyError } from "../helpers";
import { haveRole, validateJWT } from "../middlewares";
import { justifyController } from "../controllers";
import { checkIdJustification, justificationValidator, statusJustificationValidator, typeJustificationValidator } from "../helpers/justification-validation";

export const routerJustification = Router();

routerJustification.post('/register-justification', justificationValidator(), verifyError, justifyController.registerJustification)
routerJustification.post('/register-type-justification', validateJWT, haveRole, typeJustificationValidator(), verifyError, justifyController.registerTypeJustification)
routerJustification.post('/register-status-justification', validateJWT, haveRole, statusJustificationValidator(), verifyError, justifyController.registerStatusJustification)
routerJustification.get('/get-justifications', validateJWT, haveRole, verifyError, justifyController.getJustifications)
routerJustification.get('/get-type-justifications', verifyError, justifyController.getTypeJustifications)
routerJustification.get('/get-status-justifications', validateJWT, haveRole, verifyError, justifyController.getStatusJustifications)
routerJustification.get('/get-one-justification/:id_justification', validateJWT, haveRole, checkIdJustification(),verifyError, justifyController.getOneJustification)
routerJustification.patch('/update-status-justification/:id_justification', validateJWT, haveRole, checkIdJustification(), verifyError, justifyController.updateStatusJustification)