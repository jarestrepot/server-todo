"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MulterModule = void 0;
const multer_1 = __importDefault(require("multer"));
const constantes_1 = __importDefault(require("../config/constantes"));
class MulterModule {
    constructor(options = { dest: constantes_1.default.RUTA_IMAGE_DEFAULT }) {
        if (!!MulterModule.instance) {
            return MulterModule.instance;
        }
        this.dest = options.dest;
        MulterModule.instance = this;
        MulterModule.multerPropertie = (0, multer_1.default)(options);
        return this;
    }
    single(fieldName) {
        return MulterModule.multerPropertie.single(fieldName);
    }
    array(fieldName, maxCount) {
        return MulterModule.multerPropertie.array(fieldName, maxCount);
    }
    fields(fields) {
        return MulterModule.multerPropertie.fields(fields);
    }
    any() {
        return MulterModule.multerPropertie.any();
    }
    none() {
        return MulterModule.multerPropertie.none();
    }
    singleWithParameter(fieldName, id) {
        return this.single(`${fieldName}_${id}`);
    }
}
exports.MulterModule = MulterModule;
