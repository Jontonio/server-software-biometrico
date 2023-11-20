import { Router } from "express";
import { roleController } from "../controllers";
import { validateJWT, haveRole } from "../middlewares";

export const routerRoles = Router();

routerRoles.get('/get-roles', validateJWT, haveRole, roleController.getRoles );
