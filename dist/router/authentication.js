"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_js_1 = require("../controllers/authentication.js");
exports.default = (router) => {
    router.post('/auth/register', authentication_js_1.register);
    router.post('/auth/login', authentication_js_1.login);
};
//# sourceMappingURL=authentication.js.map