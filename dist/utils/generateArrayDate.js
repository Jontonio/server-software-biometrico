"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformArrayJustifications = exports.getDaysToMonth = void 0;
const moment_1 = __importDefault(require("moment"));
moment_1.default.locale('es');
const getDaysToMonth = (anio, mes) => {
    const diasEnMes = (0, moment_1.default)(`${anio}-${mes}`, 'YYYY-MM').daysInMonth();
    const diasArray = [];
    for (let dia = 1; dia <= diasEnMes; dia++) {
        const fecha = (0, moment_1.default)(`${anio}-${mes}-${dia}`, 'YYYY-MM-DD');
        const startDay = fecha.format('dddd');
        if (startDay !== 'sábado' && startDay !== 'domingo') {
            const dayInfo = {
                startDay: startDay == 'miércoles' ? startDay.slice(0, 2).toUpperCase() : startDay.slice(0, 1).toUpperCase(),
                dayNumber: dia,
            };
            diasArray.push(dayInfo);
        }
    }
    return diasArray;
};
exports.getDaysToMonth = getDaysToMonth;
const transformArrayJustifications = (label, arr) => {
    const data = Array.from({ length: 12 }, () => 0);
    arr.forEach(value => {
        data[value.month - 1] = value.counter;
    });
    return { label, data };
};
exports.transformArrayJustifications = transformArrayJustifications;
//# sourceMappingURL=generateArrayDate.js.map