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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const generateTokenUser_1 = require("./generateTokenUser");
/**
 * Verify that the user has the signing token
 * @param header Header with token
 * @param res Response
 * @param next Next function
 * @returns Nothing in case the token is correct or error response from the server
 */
const checkAuth = ({ headers }, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = headers;
    if (authorization && authorization.startsWith('Bearer ')) {
        (0, generateTokenUser_1.verifyToken)(authorization.slice(7));
        next();
        return;
    }
    return res.status(401).json({ Error: ' Acces denied ❌' });
});
exports.checkAuth = checkAuth;
