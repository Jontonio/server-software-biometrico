import { Router  } from "express";
import { verifyError, TypeStaffValidator } from "../helpers";
import { validateJWT, haveRole } from "../middlewares";
import { typeStaffController } from "../controllers";

export const routerTypeStaff = Router();

routerTypeStaff.post(`/register-type-staff`, validateJWT, haveRole, TypeStaffValidator(), verifyError, typeStaffController.registerTypeStaff)
routerTypeStaff.get(`/list-type-staff`, validateJWT, haveRole, typeStaffController.getListTypeStaff)
