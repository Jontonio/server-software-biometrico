"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerReport = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const helpers_1 = require("../helpers");
const middlewares_1 = require("../middlewares");
const report_validation_1 = require("../helpers/report-validation");
exports.routerReport = (0, express_1.Router)();
exports.routerReport.get(`/report-counter-information`, middlewares_1.validateJWT, middlewares_1.haveRole, helpers_1.verifyError, controllers_1.reportController.counterInformation);
exports.routerReport.post(`/detailed-report`, middlewares_1.validateJWT, middlewares_1.haveRole, helpers_1.verifyError, controllers_1.reportController.getReporteDetallado);
exports.routerReport.post(`/detailed-report-v2`, middlewares_1.validateJWT, middlewares_1.haveRole, helpers_1.verifyError, controllers_1.reportController.getDetailedReport);
exports.routerReport.post(`/report-info-justifications`, middlewares_1.validateJWT, middlewares_1.haveRole, (0, report_validation_1.checkYear)(), helpers_1.verifyError, controllers_1.reportController.getInfoJustifications);
//# sourceMappingURL=report.route.js.map