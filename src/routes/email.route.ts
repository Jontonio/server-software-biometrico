import { Router  } from "express";
import { emailValidator, htmlValidator, validateChangePassword } from "../helpers/auth-validation";
import { verifyError } from "../helpers";
import { comparePassword, verifyChangeEmailUser } from "../middlewares/auth.middleware";
import { emailController } from "../controllers";
import { validateJWT, validateJWTChangePassword } from "../middlewares/jwt.middleware";
import { haveRole } from "../middlewares";

export const routerEmail = Router();

routerEmail.post('/recovery-password-user', 
                  emailValidator(), 
                  verifyChangeEmailUser, 
                  verifyError,
                  emailController.recoveryPassword )
routerEmail.post('/reset-password-user', 
                validateChangePassword(), 
                verifyError,
                comparePassword,
                verifyError,
                validateJWTChangePassword,
                emailController.resetPassword )
routerEmail.post('/send-email', 
                validateJWT,
                haveRole,
                emailValidator(),
                htmlValidator(),
                verifyError,
                emailController.sendEmailStaff)