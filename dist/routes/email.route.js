"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerEmail = void 0;
const express_1 = require("express");
const auth_validation_1 = require("../helpers/auth-validation");
const helpers_1 = require("../helpers");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const controllers_1 = require("../controllers");
const jwt_middleware_1 = require("../middlewares/jwt.middleware");
const middlewares_1 = require("../middlewares");
exports.routerEmail = (0, express_1.Router)();
exports.routerEmail.post('/recovery-password-user', (0, auth_validation_1.emailValidator)(), auth_middleware_1.verifyChangeEmailUser, helpers_1.verifyError, controllers_1.emailController.recoveryPassword);
exports.routerEmail.post('/reset-password-user', (0, auth_validation_1.validateChangePassword)(), helpers_1.verifyError, auth_middleware_1.comparePassword, helpers_1.verifyError, jwt_middleware_1.validateJWTChangePassword, controllers_1.emailController.resetPassword);
exports.routerEmail.post('/send-email', jwt_middleware_1.validateJWT, middlewares_1.haveRole, (0, auth_validation_1.emailValidator)(), (0, auth_validation_1.htmlValidator)(), helpers_1.verifyError, controllers_1.emailController.sendEmailStaff);
//# sourceMappingURL=email.route.js.map