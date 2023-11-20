"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseSUNAT = exports.ResponseServer = void 0;
class ResponseServer {
    constructor(msg, status, data, count) {
        this.msg = msg;
        this.status = status;
        this.data = data;
        this.count = count;
    }
}
exports.ResponseServer = ResponseServer;
class ResponseSUNAT {
    constructor(nombres, apellidoPaterno, apellidoMaterno) {
        this.nombres = nombres;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
    }
}
exports.ResponseSUNAT = ResponseSUNAT;
//# sourceMappingURL=Response.js.map