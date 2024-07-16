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
exports.getImageByPath = exports.saveImage = exports.checkAuth = void 0;
const generateTokenUser_1 = require("./generateTokenUser");
const node_fs_1 = __importDefault(require("node:fs"));
const constantes_1 = __importDefault(require("../config/constantes"));
const path_1 = __importDefault(require("path"));
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
const saveImage = (file, id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!file) {
        return;
    }
    const { originalname, path: tempPath } = file;
    let [name, stay] = originalname.split('.');
    const newDirPath = path_1.default.join(constantes_1.default.RUTA_IMAGE_DEFAULT, id);
    const newPath = path_1.default.join(newDirPath, `avatar.${stay}`);
    try {
        // Asegúrate de que el directorio de destino exista
        if (!node_fs_1.default.existsSync(newDirPath)) {
            node_fs_1.default.mkdirSync(newDirPath, { recursive: true });
        }
        // Copiar el archivo a la nueva ubicación
        node_fs_1.default.copyFileSync(tempPath, newPath);
        // Eliminar el archivo temporal
        node_fs_1.default.unlinkSync(tempPath);
    }
    catch (error) {
        console.error('Error saving file:', error);
    }
});
exports.saveImage = saveImage;
const getImageByPath = (id) => __awaiter(void 0, void 0, void 0, function* () {
    for (let fileName of constantes_1.default.MIME_EXTENSSIONS) {
        const filePath = path_1.default.join(constantes_1.default.RUTA_IMAGE_DEFAULT, id, `${constantes_1.default.NAME_DEFAULT_IMAGE}${fileName}`);
        try {
            // Verificar si el archivo existe
            yield node_fs_1.default.promises.access(filePath, node_fs_1.default.constants.F_OK);
            // Devolver la ruta absoluta del archivo
            return getAbsoluteFilePath(process.cwd(), `${filePath}`);
        }
        catch (err) {
            console.error('Error accessing file:', err);
        }
    }
    return null;
});
exports.getImageByPath = getImageByPath;
const getAbsoluteFilePath = (rootPath, relativePath) => {
    return path_1.default.join(rootPath, relativePath);
};
