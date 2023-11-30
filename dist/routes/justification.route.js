"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerJustification = void 0;
const express_1 = require("express");
const helpers_1 = require("../helpers");
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
const justification_validation_1 = require("../helpers/justification-validation");
exports.routerJustification = (0, express_1.Router)();
exports.routerJustification.post('/register-justification', (0, justification_validation_1.justificationValidator)(), helpers_1.verifyError, controllers_1.justifyController.registerJustification);
exports.routerJustification.post('/register-type-justification', middlewares_1.validateJWT, middlewares_1.haveRole, (0, justification_validation_1.typeJustificationValidator)(), helpers_1.verifyError, controllers_1.justifyController.registerTypeJustification);
exports.routerJustification.post('/register-status-justification', middlewares_1.validateJWT, middlewares_1.haveRole, (0, justification_validation_1.statusJustificationValidator)(), helpers_1.verifyError, controllers_1.justifyController.registerStatusJustification);
exports.routerJustification.get('/get-justifications', middlewares_1.validateJWT, middlewares_1.haveRole, helpers_1.verifyError, controllers_1.justifyController.getJustifications);
exports.routerJustification.get('/get-type-justifications', helpers_1.verifyError, controllers_1.justifyController.getTypeJustifications);
exports.routerJustification.get('/get-status-justifications', middlewares_1.validateJWT, middlewares_1.haveRole, helpers_1.verifyError, controllers_1.justifyController.getStatusJustifications);
exports.routerJustification.get('/get-one-justification/:id_justification', middlewares_1.validateJWT, middlewares_1.haveRole, (0, justification_validation_1.checkIdJustification)(), helpers_1.verifyError, controllers_1.justifyController.getOneJustification);
exports.routerJustification.patch('/update-status-justification/:id_justification', middlewares_1.validateJWT, middlewares_1.haveRole, (0, justification_validation_1.checkIdJustification)(), helpers_1.verifyError, controllers_1.justifyController.updateStatusJustification);
//# sourceMappingURL=justification.route.js.map