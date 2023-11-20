import { Router  } from "express";
import { verifyError, modularCodeValidator } from "../helpers";
import { validateJWT, haveRole } from "../middlewares";
import { idCardValidatorAPI, staffValidator, attendanceOnePersonalValidator, idCardValidator } from "../helpers/staff-validation";
import { staffController } from "../controllers";
import { getOneStaffWithInstitutions } from "../controllers/staff";
import { limiter } from "../middlewares/limiter.middleware";
import { typeStaffMiddleware, institutionStaffMiddleware } from "../middlewares/";

export const routerStaff = Router();

routerStaff.post(`/register-staff`, 
                validateJWT, 
                staffValidator(), 
                verifyError, 
                typeStaffMiddleware.typeIdCardValidator,
                verifyError,
                institutionStaffMiddleware.existStaffAtTheInstitution, 
                verifyError, 
                staffController.registerStaff)
routerStaff.patch(`/update-staff/:id_card`, validateJWT, idCardValidator(), verifyError, staffController.updateStaff)
routerStaff.post(`/search-api-id-card`, validateJWT, idCardValidatorAPI(), verifyError, staffController.searchDNIAPI)
routerStaff.get(`/get-list-staff`, validateJWT, modularCodeValidator(), verifyError, staffController.getListStaff)  
routerStaff.post(`/get-one-staff-with-institutions`, limiter(5), idCardValidator(), verifyError, typeStaffMiddleware.typeIdCardValidator, verifyError, getOneStaffWithInstitutions)  
routerStaff.get(`/get-one-staff/:id_card`, validateJWT, idCardValidator(), verifyError, staffController.getOneStaff)  
routerStaff.post(`/get-one-staff-with-attendance`, validateJWT, haveRole, attendanceOnePersonalValidator(), verifyError, staffController.getOneStaffWithAttendance)  
