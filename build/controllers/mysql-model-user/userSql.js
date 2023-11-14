"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const sequelize_1 = require("sequelize");
const user_1 = require("../../entities/user");
const crypto = __importStar(require("crypto"));
const conditions_1 = __importDefault(require("../conditions/conditions"));
const constantes_1 = __importDefault(require("../../config/constantes"));
const status_1 = require("../../entities/status");
const importanceTask_1 = require("../../entities/importanceTask");
const category_1 = require("../../entities/category");
class UserModel {
}
exports.UserModel = UserModel;
_a = UserModel;
UserModel.getAccessories = () => __awaiter(void 0, void 0, void 0, function* () {
    const allStatus = yield status_1.Status.findAll({
        attributes: [
            [(0, sequelize_1.literal)('name'), 'Status'],
            [(0, sequelize_1.literal)('code'), 'codeStatus']
        ],
        raw: true
    });
    const allImportance = yield importanceTask_1.Importance.findAll({
        attributes: [
            [(0, sequelize_1.literal)('name'), 'Importance'],
            [(0, sequelize_1.literal)('code'), 'codeImportance']
        ],
        raw: true
    });
    const allCategory = yield category_1.Category.findAll({
        attributes: [
            [(0, sequelize_1.literal)('name'), 'Category'],
            [(0, sequelize_1.literal)('code'), 'codeCategory']
        ],
        raw: true
    });
    return { allCategory, allImportance, allStatus };
});
UserModel.createUserMysql = ({ name, lastName, email, password, location }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [user, created] = yield user_1.User.findOrCreate({
            where: { email },
            defaults: {
                name: name,
                lastName: lastName,
                password: yield bcrypt_1.default.hash(password, 10),
                email: email,
                user_id: crypto.randomUUID(),
                location: location !== null && location !== void 0 ? location : null,
            }
        });
        if (!created)
            return null;
        return user;
    }
    catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
});
UserModel.loginUserMysql = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existUser = yield user_1.User.findOne(conditions_1.default.queryWhere({ email: email }));
        if (!existUser || !(yield bcrypt_1.default.compare(password, existUser.password)))
            return null;
        return existUser;
    }
    catch (error) {
        console.log('Error login user:', error);
        return null;
    }
});
UserModel.getUserIdMysql = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_1.User.findOne(conditions_1.default.queryWhere({ user_id: id }));
});
UserModel.updateUser = ({ name, lastName, email, password, location }, idUser, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findUser = yield user_1.User.findOne({ where: { user_id: idUser } });
        if (!findUser)
            return { error: "User not found", found: false };
        if (!(yield bcrypt_1.default.compare(password, findUser.password)))
            return { error: "Password is incorrect", found: false };
        return yield findUser.update({
            name,
            lastName,
            email,
            password: yield bcrypt_1.default.hash(newPassword, 10),
            location: location !== null && location !== void 0 ? location : null
        }, {
            where: { id: idUser }
        });
    }
    catch (error) {
        return { error: constantes_1.default.ERROR_REQUEST, found: false };
    }
});
UserModel.deleteUser = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_1.User.destroy(conditions_1.default.queryWhere({ user_id }));
});
