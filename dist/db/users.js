"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserById = exports.deleteUserById = exports.createUser = exports.getUsersById = exports.getUsersBySessionToken = exports.getUsersByEmail = exports.getUsers = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, required: true, select: false },
        sessionToken: { type: String, select: false },
    },
});
exports.UserModel = mongoose_1.default.model('User', UserSchema);
const getUsers = () => exports.UserModel.find();
exports.getUsers = getUsers;
const getUsersByEmail = (email) => exports.UserModel.findOne({ email });
exports.getUsersByEmail = getUsersByEmail;
const getUsersBySessionToken = (sessionToken) => exports.UserModel.findOne({ 'authentication.sessionToken': sessionToken,
});
exports.getUsersBySessionToken = getUsersBySessionToken;
const getUsersById = (id) => exports.UserModel.findById(id);
exports.getUsersById = getUsersById;
const createUser = (values) => new exports.UserModel(values).save().then((user) => user.toObject());
exports.createUser = createUser;
const deleteUserById = (id) => exports.UserModel.findOneAndDelete({ _id: id });
exports.deleteUserById = deleteUserById;
const UpdateUserById = (id, values) => exports.UserModel.findByIdAndUpdate(id, values);
exports.UpdateUserById = UpdateUserById;
//# sourceMappingURL=users.js.map