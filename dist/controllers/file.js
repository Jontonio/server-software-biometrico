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
exports.uploadFile = void 0;
const Response_1 = require("../class/Response");
const config_1 = require("../config/config");
const uploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { file } = req;
        const url_document = `${config_1.globalConfig.APP_URL}:${config_1.globalConfig.PORT}/www/uploads/${file === null || file === void 0 ? void 0 : file.filename}`;
        const data = Object.assign(Object.assign({}, file), { url_document });
        return res.status(200).json(new Response_1.ResponseServer('Archivo subido correctamente', true, data));
    }
    catch (e) {
        console.error(e);
        return res.status(500).json(new Response_1.ResponseServer('Ocurrio un error al subir archivo', false));
    }
});
exports.uploadFile = uploadFile;
//# sourceMappingURL=file.js.map