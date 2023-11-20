"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerInstitution = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const helpers_1 = require("../helpers");
const middlewares_1 = require("../middlewares");
const middlewares_2 = require("../middlewares");
const institution_shift_validation_copy_1 = require("../helpers/institution-shift-validation copy");
exports.routerInstitution = (0, express_1.Router)();
exports.routerInstitution.post(`/register-institution`, middlewares_1.validateJWT, middlewares_1.haveRole, (0, helpers_1.InstitutionValidator)(), helpers_1.verifyError, middlewares_2.institucionMiddleware.existInstitutionShift, helpers_1.verifyError, controllers_1.institucionController.registerInstitution);
exports.routerInstitution.put(`/update-institution/:modular_code`, middlewares_1.validateJWT, middlewares_1.haveRole, (0, helpers_1.modularCodeValidator)(), helpers_1.verifyError, controllers_1.institucionController.updateInstitution);
exports.routerInstitution.get(`/get-institutions/`, middlewares_1.validateJWT, middlewares_1.haveRole, controllers_1.institucionController.getInstitutions);
exports.routerInstitution.get(`/get-one-institution/:modular_code`, middlewares_1.validateJWT, middlewares_1.haveRole, (0, helpers_1.modularCodeValidator)(), helpers_1.verifyError, controllers_1.institucionController.getOneInstitution);
exports.routerInstitution.get(`/get-one-institution-with-shift/:id_institution_shift`, middlewares_1.validateJWT, middlewares_1.haveRole, (0, institution_shift_validation_copy_1.checkIdInstitutionShift)(), helpers_1.verifyError, controllers_1.institucionController.getOneInstitutionWithShift);
exports.routerInstitution.delete(`/delete-institution/:modular_code`, middlewares_1.validateJWT, middlewares_1.haveRole, middlewares_1.isAdminRole, (0, helpers_1.modularCodeValidator)(), helpers_1.verifyError, controllers_1.institucionController.deleteInstitution);
exports.routerInstitution.get(`/get-one-institution-from-json/:modular_code`, middlewares_1.validateJWT, middlewares_1.haveRole, (0, helpers_1.codModularExistListJSON)(), helpers_1.verifyError, controllers_1.institucionController.getOneResourceInstitution);
exports.routerInstitution.get(`/get-institution-with-staff-with-shift/:id_institution_shift`, middlewares_1.validateJWT, middlewares_1.haveRole, (0, institution_shift_validation_copy_1.checkIdInstitutionShift)(), helpers_1.verifyError, controllers_1.institucionController.getOneInstitutionWithStaff);
//# sourceMappingURL=institucion.route.js.map