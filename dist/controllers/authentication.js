"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const users_js_1 = require("../db/users.js");
const index_js_1 = require("../helpers/index.js");
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.sendStatus(400);
        }
        const user = await (0, users_js_1.getUsersByEmail)(email).select('+authentication.salt +authentication.password');
        if (!user || !user.authentication || !user.authentication.salt) {
            return res.sendStatus(400);
        }
        const expectedHash = (0, index_js_1.authentication)(user.authentication.salt, password);
        if (user.authentication.password !== expectedHash) {
            return res.sendStatus(403);
        }
        const salt = (0, index_js_1.random)();
        user.authentication.sessionToken = (0, index_js_1.authentication)(salt, user._id.toString());
        await user.save();
        res.cookie('ADWIKA-AUTH', user.authentication.sessionToken, {
            domain: 'localhost',
            path: '/',
        });
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.login = login;
const register = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            return res.sendStatus(400);
        }
        const existingUser = await (0, users_js_1.getUsersByEmail)(email);
        if (existingUser) {
            return res.sendStatus(400);
        }
        const salt = (0, index_js_1.random)();
        const user = await (0, users_js_1.createUser)({
            email,
            username,
            authentication: {
                salt,
                password: (0, index_js_1.authentication)(salt, password),
            },
        });
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.register = register;
//# sourceMappingURL=authentication.js.map