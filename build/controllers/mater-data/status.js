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
exports.StatusModel = void 0;
const status_1 = require("../../entities/status");
class StatusModel {
    static getStatus(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield status_1.Status.findOne({
                attributes: ['Status'],
                where: { id },
                raw: true
            });
        });
    }
}
exports.StatusModel = StatusModel;
