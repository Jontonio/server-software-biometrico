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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const config_1 = require("../config/config");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const handlebars_1 = __importDefault(require("handlebars"));
mail_1.default.setApiKey(config_1.globalConfig.SEND_GRID_API_KEY);
// async..await is not allowed in global scope, must use a wrapper
const sendEmail = (data, to, nameTemplate) => __awaiter(void 0, void 0, void 0, function* () {
    const emailTemplate = fs_1.default.readFileSync(path_1.default.join(__dirname, `/templates/${nameTemplate}.handlebars`), 'utf-8');
    const template = handlebars_1.default.compile(emailTemplate);
    const messageBody = template(data);
    return mail_1.default.send({
        to,
        from: 'ceidbot@gmail.com',
        subject: 'Solicitud de recuperación de contraseña',
        templateId: 'd-10d3209b0d7b43e5ab23dc1f2195c346',
        dynamicTemplateData: {
            subject: 'Testing Templates & Stuff',
            name: 'José',
            city: '<b>Denver<b>',
        },
    });
});
exports.sendEmail = sendEmail;
//# sourceMappingURL=nodeMailer.js.map