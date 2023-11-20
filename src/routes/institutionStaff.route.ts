import { Router  } from "express";
import { verifyError } from "../helpers/verify-error";
import { IEStaffController } from "../controllers";
import { validateJWT, haveRole } from "../middlewares";
import { checkIdInstitutionStaff, institutionStaffValidator } from "../helpers/institution-staff-validation";
import { checkIdInstitutionShift } from "../helpers/institution-shift-validation copy";

export const routerInstitutionStaff = Router();

routerInstitutionStaff.post(`/register-staff-at-the-institution`, validateJWT, haveRole, institutionStaffValidator(), verifyError, IEStaffController.registerStaffAtTheInstitution)
routerInstitutionStaff.get(`/get-work-schedule-institution-staff/:id_institution_staff`, validateJWT, haveRole, checkIdInstitutionStaff(), verifyError, IEStaffController.getScheduleStaffAtTheInstitution)
routerInstitutionStaff.get(`/get-one-staff-at-the-institution/:id_institution_staff/:id_institution_shift`, validateJWT, haveRole, checkIdInstitutionStaff(), checkIdInstitutionShift(), verifyError, IEStaffController.getOneStaffAtTheInstitution)  
routerInstitutionStaff.patch(`/delete-one-staff-at-the-institution/:id_institution_staff`, validateJWT, haveRole, checkIdInstitutionStaff(), verifyError, IEStaffController.deleteStaffAtTheInstitution)  
