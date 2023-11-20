
import { Router  } from "express";
import { verifyError, userValidator, idValidator } from "../helpers";
import { validateJWT, isAdminRole, haveRole } from "../middlewares";
import { userController } from "../controllers";

export const routerUser = Router();

routerUser.get(`/get-users`, validateJWT, haveRole, userController.getUsers )
routerUser.get(`/get-one-user/:id_user`, validateJWT, haveRole, idValidator(), verifyError, userController.getOneUser )
routerUser.post(`/register-user`, validateJWT, haveRole, userValidator(), verifyError, userController.registerUser )
routerUser.patch(`/update-user/:id_user`, validateJWT, haveRole, idValidator(), verifyError, userController.updateUser )
routerUser.delete(`/delete-user/:id_user`, validateJWT, haveRole, isAdminRole, idValidator(), verifyError, userController.deleteUser )

