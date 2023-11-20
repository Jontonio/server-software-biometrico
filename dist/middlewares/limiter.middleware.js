"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.limiter = void 0;
const express_rate_limit_1 = require("express-rate-limit");
const limiter = (limit = 100) => {
    return (0, express_rate_limit_1.rateLimit)({
        windowMs: 15 * 60 * 1000,
        limit,
        standardHeaders: 'draft-7',
        skipFailedRequests: true,
        legacyHeaders: false,
        // store: ... , // Use an external store for consistency across multiple server instances.
        handler: (req, res, next, options) => res.status(options.statusCode).send({ msg: 'Realizó demasiadas solicitudes. Por favor inténtelo más tarde.' })
    });
};
exports.limiter = limiter;
//# sourceMappingURL=limiter.middleware.js.map