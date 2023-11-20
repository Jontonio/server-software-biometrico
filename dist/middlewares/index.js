"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.institutionStaffMiddleware = exports.institucionMiddleware = exports.staffMiddleware = exports.typeStaffMiddleware = exports.isAdminRole = exports.haveRole = exports.validateJWT = void 0;
var jwt_middleware_1 = require("./jwt.middleware");
Object.defineProperty(exports, "validateJWT", { enumerable: true, get: function () { return jwt_middleware_1.validateJWT; } });
var role_middleware_1 = require("./role.middleware");
Object.defineProperty(exports, "haveRole", { enumerable: true, get: function () { return role_middleware_1.haveRole; } });
Object.defineProperty(exports, "isAdminRole", { enumerable: true, get: function () { return role_middleware_1.isAdminRole; } });
const typeStaffMiddleware = __importStar(require("./typeStaff.middleware"));
exports.typeStaffMiddleware = typeStaffMiddleware;
const staffMiddleware = __importStar(require("./staff.middleware"));
exports.staffMiddleware = staffMiddleware;
const institutionStaffMiddleware = __importStar(require("./institutionStaff.middleware"));
exports.institutionStaffMiddleware = institutionStaffMiddleware;
const institucionMiddleware = __importStar(require("./institution.middleware"));
exports.institucionMiddleware = institucionMiddleware;
//# sourceMappingURL=index.js.map