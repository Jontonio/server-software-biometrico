"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerAuth = void 0;
const express_1 = require("express");
const helpers_1 = require("../helpers");
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const auth_validation_1 = require("../helpers/auth-validation");
exports.routerAuth = (0, express_1.Router)();
exports.routerAuth.post('/login', (0, helpers_1.authValidator)(), helpers_1.verifyError, controllers_1.authController.login);
exports.routerAuth.get('/check-auth-user', middlewares_1.validateJWT, middlewares_1.haveRole, helpers_1.verifyError, controllers_1.authController.checkAuth);
exports.routerAuth.patch('/update-password-user/:id_user', middlewares_1.validateJWT, middlewares_1.haveRole, (0, auth_validation_1.verifyExistIdUser)(), (0, auth_validation_1.authValidatorChangePassword)(), auth_middleware_1.comparePassword, helpers_1.verifyError, controllers_1.authController.updatePassword);
//# sourceMappingURL=auth.route.js.map