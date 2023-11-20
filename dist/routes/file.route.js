"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerStaticFile = exports.routerFile = void 0;
const express_1 = require("express");
const file_middleware_1 = require("../middlewares/file.middleware");
const controllers_1 = require("../controllers");
exports.routerFile = (0, express_1.Router)();
exports.routerStaticFile = (0, express_1.Router)();
exports.routerFile.post('/file-justification-upload', file_middleware_1.uploadMulter.single('archivo'), file_middleware_1.multerErrorHandler, controllers_1.fileController.uploadFile);
exports.routerStaticFile.get('', file_middleware_1.validateAuthorization);
//# sourceMappingURL=file.route.js.map