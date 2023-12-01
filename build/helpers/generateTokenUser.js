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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.tokenSing = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const tokenSing = ({ name, email, user_id }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        return jsonwebtoken_1.default.sign({
            id: user_id,
            name: name,
            email,
        }, (_a = process.env.SECRET_KEY) !== null && _a !== void 0 ? _a : 'salleFron@Grupo02TheDreamTeam', {
            expiresIn: "24h"
        });
    }
    catch (error) {
        console.error(error);
    }
});
exports.tokenSing = tokenSing;
/**
 * Verify the token
 * @param token
 * @returns Token or null
 */
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        return jsonwebtoken_1.default.verify(token, (_b = process.env.SECRET_KEY) !== null && _b !== void 0 ? _b : 'salleFron@Grupo02TheDreamTeam');
    }
    catch (error) {
        return null;
    }
});
exports.verifyToken = verifyToken;
