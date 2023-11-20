import { Router  } from "express";
import { validateJWT, haveRole, isAdminRole } from "../middlewares";
import { verifyError, biometricValidator, checkIdBiometric, modularCodeValidator } from "../helpers";
import { biometricController } from "../controllers";

export const routerBiometric = Router();

routerBiometric.post(`/register-biometric`, validateJWT, haveRole, biometricValidator(),verifyError, biometricController.registerBiometric)
routerBiometric.get(`/get-biometrics-from-an-institution/:modular_code`, validateJWT, haveRole, modularCodeValidator(), verifyError, biometricController.getBiometricsFromAnInstitution)
routerBiometric.get(`/get-one-biometric/:id_biometric`, validateJWT, haveRole, checkIdBiometric(), verifyError, biometricController.getOneBiometric)
routerBiometric.patch(`/update-biometric/:id_biometric`, validateJWT, haveRole, checkIdBiometric(), verifyError, biometricController.updateBiometric)
routerBiometric.delete(`/delete-biometric/:id_biometric`, validateJWT, haveRole, isAdminRole, checkIdBiometric(), verifyError, biometricController.deleteBiometric)
