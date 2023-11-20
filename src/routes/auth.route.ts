import { Router  } from "express";
import { verifyError, authValidator } from "../helpers";
import { haveRole, validateJWT } from "../middlewares";
import { authController } from "../controllers";
import { comparePassword } from "../middlewares/auth.middleware";
import { authValidatorChangePassword, verifyExistIdUser } from "../helpers/auth-validation";

export const routerAuth = Router();

routerAuth.post('/login', authValidator(), verifyError, authController.login)
routerAuth.get('/check-auth-user', validateJWT, haveRole, verifyError, authController.checkAuth)
routerAuth.patch('/update-password-user/:id_user', validateJWT, haveRole, verifyExistIdUser(), authValidatorChangePassword(), comparePassword, verifyError, authController.updatePassword)
