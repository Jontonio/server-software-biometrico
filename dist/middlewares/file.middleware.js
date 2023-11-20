"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAuthorization = exports.multerErrorHandler = exports.uploadMulter = void 0;
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const Response_1 = require("../class/Response");
const helpers_1 = require("../helpers");
const fileSizeMB = 5; //file size in MB
const fileSize = 1000000 * fileSizeMB; //file size in bytes
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/www/uploads');
    },
    filename: function (req, file, cb) {
        const { originalname } = file;
        const extSplit = originalname.split('.');
        const ext = extSplit[extSplit.length - 1];
        cb(null, `${(0, uuid_1.v4)()}.${ext}`);
    }
});
exports.uploadMulter = (0, multer_1.default)({
    storage,
    limits: {
        fileSize
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
        if (!allowedMimes.includes(file.mimetype)) {
            return cb(new Error('Error en la subida de archivo. Archivos permitidos (PDF - PNG - JPG)'));
        }
        return cb(null, true);
    }
});
// Middleware de manejo de errores específico para Multer
const multerErrorHandler = (err, req, res, next) => {
    if (err && err.code == 'LIMIT_FILE_SIZE') {
        return res.status(400).json(new Response_1.ResponseServer(`Error en la subida de archivo. Tamaño de archivo mínimo permitido ${fileSizeMB} MB`, false));
    }
    if (err) {
        return res.status(400).json(new Response_1.ResponseServer(err.message, false));
    }
    next();
};
exports.multerErrorHandler = multerErrorHandler;
const validateAuthorization = (req, res, next) => {
    try {
        const { authorization } = req.query;
        // verify if exist token 
        if (!authorization) {
            return res.status(401).json(new Response_1.ResponseServer(`En necesario la autorización para mostrar el archivo`, false));
        }
        // validate token with jwt
        (0, helpers_1.getPayloadToken)(String(authorization));
        next();
    }
    catch (e) {
        return res.status(500).json(new Response_1.ResponseServer(`Error de autorización: ${e.message}`, false, null));
    }
};
exports.validateAuthorization = validateAuthorization;
//# sourceMappingURL=file.middleware.js.map