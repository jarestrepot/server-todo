"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../../controllers/user/userController");
const auth_1 = require("../../helpers/auth");
const multer_image_1 = require("../../middlewares/multer-image");
const constantes_1 = __importDefault(require("../../config/constantes"));
const multer = new multer_image_1.MulterModule();
const router = (0, express_1.Router)();
router.get('/', userController_1.UserServiceApp.taskPlugins);
router.post('/login', userController_1.UserServiceApp.loginUser);
router.post('/register', userController_1.UserServiceApp.createUser);
router.post('/newTask/:id', auth_1.checkAuth, userController_1.UserServiceApp.newTask);
router.delete('/deleteTask/:id', auth_1.checkAuth, userController_1.UserServiceApp.deleteTask);
router.patch('/updateTask/:id', auth_1.checkAuth, userController_1.UserServiceApp.updateTask);
router.get('/task/:id', auth_1.checkAuth, userController_1.UserServiceApp.getTask);
router.patch('/modify/:id', auth_1.checkAuth, userController_1.UserServiceApp.modifyUser);
router.post('/image/:id', multer.single(constantes_1.default.IMAGE_USER), userController_1.UserServiceApp.updateImage);
router.patch('/arcivedTask/:id', auth_1.checkAuth, userController_1.UserServiceApp.archivedTask);
router.post('/checkedPassword/:id', auth_1.checkAuth, userController_1.UserServiceApp.confirmPassword);
router.delete('/delete/:id', auth_1.checkAuth, userController_1.UserServiceApp.deleteUser);
exports.default = router;
