"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.existWorkScheduleTime = void 0;
const models_1 = require("../models");
const Response_1 = require("../class/Response");
const existWorkScheduleTime = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { arrival_time, departure_time } = req.body;
    //find at the instituion
    const institutionShift = yield models_1.WorkSchedule.findOne({
        where: { arrival_time, departure_time },
    });
    if (institutionShift) {
        return res.status(400).json(new Response_1.ResponseServer(`El horario laboral ya se encuentra registrado. Registe uno nuevo`, false));
    }
    next();
});
exports.existWorkScheduleTime = existWorkScheduleTime;
//# sourceMappingURL=work-schedule.middleware.js.map