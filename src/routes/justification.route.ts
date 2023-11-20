import { Router  } from "express";
import { verifyError } from "../helpers";
import { haveRole, validateJWT } from "../middlewares";
import { authController, justifyController } from "../controllers";
import { justificationValidator } from "../helpers/justification-validation";

export const routerJustification = Router();

routerJustification.post('/register-justification', justificationValidator(), verifyError, justifyController.registerJustification)
routerJustification.get('/get-justifications', validateJWT, haveRole, verifyError, justifyController.getJustifications)
routerJustification.get('/get-one-justification/:id_justification', validateJWT, haveRole, verifyError, justifyController.getOneJustification)