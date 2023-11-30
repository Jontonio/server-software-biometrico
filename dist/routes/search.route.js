"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerSearch = void 0;
const express_1 = require("express");
const verify_error_1 = require("../helpers/verify-error");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const search_validation_1 = require("../helpers/search-validation");
exports.routerSearch = (0, express_1.Router)();
exports.routerSearch.post(`/search/:table/:term`, middlewares_1.validateJWT, middlewares_1.haveRole, (0, search_validation_1.searchValidator)(), verify_error_1.verifyError, controllers_1.searchController.searchInformation);
//# sourceMappingURL=search.route.js.map