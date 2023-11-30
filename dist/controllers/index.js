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
exports.searchController = exports.emailController = exports.justifyController = exports.userController = exports.workScheduleController = exports.roleController = exports.attendanceController = exports.shiftController = exports.fileController = exports.typeAttendanceController = exports.authController = exports.typeStaffController = exports.workSIEController = exports.institucionController = exports.biometricController = exports.staffController = exports.IEStaffController = exports.reportController = void 0;
const typeAttendanceController = __importStar(require("./typeAttendance"));
exports.typeAttendanceController = typeAttendanceController;
const workScheduleController = __importStar(require("./workSchedule"));
exports.workScheduleController = workScheduleController;
const typeStaffController = __importStar(require("./typeStaff"));
exports.typeStaffController = typeStaffController;
const workSIEController = __importStar(require("./workScheduleIE"));
exports.workSIEController = workSIEController;
const authController = __importStar(require("./auth"));
exports.authController = authController;
const reportController = __importStar(require("./report"));
exports.reportController = reportController;
const IEStaffController = __importStar(require("./institutionStaff"));
exports.IEStaffController = IEStaffController;
const fileController = __importStar(require("./file"));
exports.fileController = fileController;
const attendanceController = __importStar(require("./attendance"));
exports.attendanceController = attendanceController;
const roleController = __importStar(require("./role"));
exports.roleController = roleController;
const institucionController = __importStar(require("./institucion"));
exports.institucionController = institucionController;
const biometricController = __importStar(require("./biometric"));
exports.biometricController = biometricController;
const staffController = __importStar(require("./staff"));
exports.staffController = staffController;
const userController = __importStar(require("./user"));
exports.userController = userController;
const justifyController = __importStar(require("./justification"));
exports.justifyController = justifyController;
const shiftController = __importStar(require("./shift"));
exports.shiftController = shiftController;
const searchController = __importStar(require("./search"));
exports.searchController = searchController;
const emailController = __importStar(require("./email"));
exports.emailController = emailController;
//# sourceMappingURL=index.js.map