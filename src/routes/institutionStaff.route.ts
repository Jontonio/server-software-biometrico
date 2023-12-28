import { Router  } from "express";
import { verifyError } from "../helpers/verify-error";
import { IEStaffController } from "../controllers";
import { validateJWT, haveRole, institutionStaffMiddleware } from "../middlewares";
import { checkIdInstitutionStaff, institutionStaffUpdateValidator, institutionStaffValidator } from "../helpers/institution-staff-validation";
import { checkIdInstitutionShift } from "../helpers/institution-shift-validation";

export const routerInstitutionStaff = Router();

routerInstitutionStaff.post(`/register-exist-staff-at-the-institution`, 
                            validateJWT, 
                            haveRole, 
                            institutionStaffValidator(), 
                            verifyError, 
                            institutionStaffMiddleware.existStaffAtTheInstitution,
                            verifyError,
                            IEStaffController.registerStaffAtTheInstitution)
routerInstitutionStaff.patch(`/update-exist-staff-at-the-institution/:id_institution_staff`, 
                            validateJWT, 
                            haveRole, 
                            checkIdInstitutionStaff(),
                            verifyError, 
                            institutionStaffUpdateValidator(), 
                            verifyError, 
                            IEStaffController.updateStaffAtTheInstitution)
routerInstitutionStaff.get(`/get-work-schedule-institution-staff/:id_institution_staff`, validateJWT, haveRole, checkIdInstitutionStaff(), verifyError, IEStaffController.getScheduleStaffAtTheInstitution)
routerInstitutionStaff.get(`/get-one-staff-at-the-institution/:id_institution_staff/:id_institution_shift`, validateJWT, haveRole, checkIdInstitutionStaff(), checkIdInstitutionShift(), verifyError, IEStaffController.getOneStaffAtTheInstitution)  
routerInstitutionStaff.patch(`/delete-one-staff-at-the-institution/:id_institution_staff`, validateJWT, haveRole, checkIdInstitutionStaff(), verifyError, IEStaffController.deleteStaffAtTheInstitution)  
