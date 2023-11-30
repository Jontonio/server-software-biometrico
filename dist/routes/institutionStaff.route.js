"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerInstitutionStaff = void 0;
const express_1 = require("express");
const verify_error_1 = require("../helpers/verify-error");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const institution_staff_validation_1 = require("../helpers/institution-staff-validation");
const institution_shift_validation_copy_1 = require("../helpers/institution-shift-validation copy");
exports.routerInstitutionStaff = (0, express_1.Router)();
exports.routerInstitutionStaff.post(`/register-exist-staff-at-the-institution`, middlewares_1.validateJWT, middlewares_1.haveRole, (0, institution_staff_validation_1.institutionStaffValidator)(), verify_error_1.verifyError, middlewares_1.institutionStaffMiddleware.existStaffAtTheInstitution, verify_error_1.verifyError, controllers_1.IEStaffController.registerStaffAtTheInstitution);
exports.routerInstitutionStaff.patch(`/update-exist-staff-at-the-institution/:id_institution_staff`, middlewares_1.validateJWT, middlewares_1.haveRole, (0, institution_staff_validation_1.checkIdInstitutionStaff)(), verify_error_1.verifyError, (0, institution_staff_validation_1.institutionStaffUpdateValidator)(), verify_error_1.verifyError, controllers_1.IEStaffController.updateStaffAtTheInstitution);
exports.routerInstitutionStaff.get(`/get-work-schedule-institution-staff/:id_institution_staff`, middlewares_1.validateJWT, middlewares_1.haveRole, (0, institution_staff_validation_1.checkIdInstitutionStaff)(), verify_error_1.verifyError, controllers_1.IEStaffController.getScheduleStaffAtTheInstitution);
exports.routerInstitutionStaff.get(`/get-one-staff-at-the-institution/:id_institution_staff/:id_institution_shift`, middlewares_1.validateJWT, middlewares_1.haveRole, (0, institution_staff_validation_1.checkIdInstitutionStaff)(), (0, institution_shift_validation_copy_1.checkIdInstitutionShift)(), verify_error_1.verifyError, controllers_1.IEStaffController.getOneStaffAtTheInstitution);
exports.routerInstitutionStaff.patch(`/delete-one-staff-at-the-institution/:id_institution_staff`, middlewares_1.validateJWT, middlewares_1.haveRole, (0, institution_staff_validation_1.checkIdInstitutionStaff)(), verify_error_1.verifyError, controllers_1.IEStaffController.deleteStaffAtTheInstitution);
//# sourceMappingURL=institutionStaff.route.js.map