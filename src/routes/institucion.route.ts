
import { Router  } from "express";
import { institucionController} from "../controllers";
import { verifyError, modularCodeValidator, codModularExistListJSON, InstitutionValidator } from "../helpers";
import { haveRole, isAdminRole, validateJWT } from "../middlewares";
import { institucionMiddleware } from "../middlewares";
import { checkIdInstitutionShift } from "../helpers/institution-shift-validation";

export const routerInstitution = Router();

routerInstitution.post(`/register-institution`, validateJWT, haveRole, InstitutionValidator(), verifyError, institucionMiddleware.existInstitutionShift, verifyError, institucionController.registerInstitution )
routerInstitution.put(`/update-institution/:modular_code`, validateJWT, haveRole, modularCodeValidator(), verifyError, institucionController.updateInstitution )
routerInstitution.get(`/get-institutions/`, 
                      validateJWT, 
                      haveRole, 
                      institucionController.getInstitutions)
routerInstitution.get(`/get-one-institution/:modular_code`, 
                      validateJWT, 
                      haveRole, 
                      modularCodeValidator(), 
                      verifyError, 
                      institucionController.getOneInstitution )
routerInstitution.get(`/get-one-institution-with-shift/:id_institution_shift`, validateJWT, haveRole, checkIdInstitutionShift(), verifyError, institucionController.getOneInstitutionWithShift )
routerInstitution.delete(`/delete-institution/:modular_code`, validateJWT, haveRole, isAdminRole, modularCodeValidator(), verifyError, institucionController.deleteInstitution )
routerInstitution.get(`/get-one-institution-from-json/:modular_code`, validateJWT, haveRole, codModularExistListJSON(), verifyError, institucionController.getOneResourceInstitution)
routerInstitution.get(`/get-institution-with-staff-with-shift/:id_institution_shift`, validateJWT, haveRole, checkIdInstitutionShift(), verifyError, institucionController.getOneInstitutionWithStaff)
