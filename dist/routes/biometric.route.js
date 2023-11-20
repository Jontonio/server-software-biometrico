"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerBiometric = void 0;
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const helpers_1 = require("../helpers");
const controllers_1 = require("../controllers");
exports.routerBiometric = (0, express_1.Router)();
exports.routerBiometric.post(`/register-biometric`, middlewares_1.validateJWT, middlewares_1.haveRole, (0, helpers_1.biometricValidator)(), helpers_1.verifyError, controllers_1.biometricController.registerBiometric);
exports.routerBiometric.get(`/get-biometrics-from-an-institution/:modular_code`, middlewares_1.validateJWT, middlewares_1.haveRole, (0, helpers_1.modularCodeValidator)(), helpers_1.verifyError, controllers_1.biometricController.getBiometricsFromAnInstitution);
exports.routerBiometric.get(`/get-one-biometric/:id_biometric`, middlewares_1.validateJWT, middlewares_1.haveRole, (0, helpers_1.checkIdBiometric)(), helpers_1.verifyError, controllers_1.biometricController.getOneBiometric);
exports.routerBiometric.patch(`/update-biometric/:id_biometric`, middlewares_1.validateJWT, middlewares_1.haveRole, (0, helpers_1.checkIdBiometric)(), helpers_1.verifyError, controllers_1.biometricController.updateBiometric);
exports.routerBiometric.delete(`/delete-biometric/:id_biometric`, middlewares_1.validateJWT, middlewares_1.haveRole, middlewares_1.isAdminRole, (0, helpers_1.checkIdBiometric)(), helpers_1.verifyError, controllers_1.biometricController.deleteBiometric);
//# sourceMappingURL=biometric.route.js.map