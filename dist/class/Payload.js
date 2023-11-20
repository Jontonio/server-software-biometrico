"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = exports.Payload = void 0;
class Payload {
    constructor(data, iat, exp) {
        this.data = data;
        this.iat = iat;
        this.exp = exp;
    }
}
exports.Payload = Payload;
class Data {
    constructor(id_user, names, email) {
        this.id_user = id_user;
        this.names = names;
        this.email = email;
    }
}
exports.Data = Data;
//# sourceMappingURL=Payload.js.map