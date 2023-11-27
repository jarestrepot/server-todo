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
exports.CategoryModel = void 0;
const sequelize_1 = require("sequelize");
const category_1 = require("../../entities/category");
class CategoryModel {
    static getCategory(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return (_a = yield category_1.Category.findOne({
                attributes: [[(0, sequelize_1.literal)('name'), 'Category']],
                where: { id: id },
                raw: true
            })) !== null && _a !== void 0 ? _a : [];
        });
    }
}
exports.CategoryModel = CategoryModel;
