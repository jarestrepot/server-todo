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
exports.UserServiceApp = void 0;
const userSql_1 = require("../mysql-model-user/userSql");
const user_1 = require("../../entities/user");
const generateTokenUser_1 = require("../../helpers/generateTokenUser");
const task_1 = require("../mysql-model-task/task");
const category_1 = require("../mater-data/category");
const importance_1 = require("../mater-data/importance");
const status_1 = require("../mater-data/status");
const constantes_1 = __importDefault(require("../../config/constantes"));
const auth_1 = require("../../helpers/auth");
class UserServiceApp {
    static taskPlugins(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { allCategory, allImportance, allStatus } = yield userSql_1.UserModel.getAccessories();
                return res.status(200).json({ category: allCategory, importance: allImportance, status: allStatus });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ Error: constantes_1.default.ERROR_SERVER });
            }
        });
    }
    static createUser({ body }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, lastName } = body;
            try {
                const resultCreated = yield userSql_1.UserModel.createUserMysql(body);
                if (!resultCreated)
                    return res.status(302).json({ msg: `User ${name} ${lastName} alredy exists` });
                // **  Generate the token
                return res.status(201).json({ resultCreated, token: yield (0, generateTokenUser_1.tokenSing)(resultCreated) });
            }
            catch (error) {
                return res.status(500).json({ Error: constantes_1.default.ERROR_SERVER });
            }
        });
    }
    static loginUser({ body }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = body;
                const resultRegister = yield userSql_1.UserModel.loginUserMysql(body);
                if (!resultRegister)
                    return res.status(404).json({ Error: constantes_1.default.INCORRECT_VALUES });
                const tasksUser = yield task_1.TaskModel.userAndTask(resultRegister.user_id);
                // **  Generate the token
                return res.status(200).json({ dataUser: resultRegister, token: yield (0, generateTokenUser_1.tokenSing)(resultRegister), tasks: tasksUser });
            }
            catch (error) {
                console.error('Error', error);
                return res.status(500).json({ Error: constantes_1.default.ERROR_SERVER });
            }
        });
    }
    static newTask({ body, params }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = params;
                const getUserId = yield userSql_1.UserModel.getUserIdMysql(id);
                if (!getUserId)
                    return res.status(404).json({ Error: `User with id (**${id.slice(32, -1)}**) does not exist` });
                const newTask = yield task_1.TaskModel.createTask(body, getUserId.user_id);
                if (!newTask)
                    return res.status(500).json({ Error: `It was not possible to create the task` });
                const { Importance } = yield importance_1.ImportanceModel.getImportance(body.importance);
                const { Category } = yield category_1.CategoryModel.getCategory(body.category);
                const { Status } = yield status_1.StatusModel.getStatus(body.status);
                return res.status(201).json({
                    msg: `Task created successfully`, task: {
                        id: newTask.id,
                        title: newTask.title,
                        description: newTask.description,
                        Category,
                        Importance,
                        Status,
                        archived: newTask.archived
                    }
                });
            }
            catch (error) {
                return res.status(500).json({ Error: constantes_1.default.ERROR_SERVER });
            }
        });
    }
    static deleteTask({ params }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = params;
            const resultDelete = yield task_1.TaskModel.deleteTask(id);
            if (resultDelete > 0)
                return res.status(200).json({ msg: `Task delete successfully` });
            return res.status(202).json({ Error: `Task not found` });
        });
    }
    static updateTask({ body, params }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = params;
                const userTask = yield userSql_1.UserModel.getUserIdMysql(id);
                if (!userTask)
                    return res.status(404).json({ Error: `There is no user with that id **${id.slice(32, -1)}**` });
                const resultUpdate = yield task_1.TaskModel.updateTask(body, id);
                if (resultUpdate > 0)
                    return res.status(200).json({ msg: 'Task updated successfully', task: yield task_1.TaskModel.getTaskId(body.id) });
                return res.status(202).json({ msg: `Task not found` });
            }
            catch (error) {
                return res.status(500).json({ Error: constantes_1.default.ERROR_SERVER });
            }
        });
    }
    static getTask({ params }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = params;
                const task = yield task_1.TaskModel.getTaskId(id);
                if (!task)
                    return res.status(302).json({ msg: 'Task not found' });
                return res.status(200).json({ task });
            }
            catch (error) {
                return res.status(500).json({ Error: constantes_1.default.ERROR_SERVER });
            }
        });
    }
    static archivedTask({ params }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = params;
                const task = yield task_1.TaskModel.archivedTask(id);
                if (typeof task === 'number' && task > 0)
                    return res.status(200).json({ msg: 'Task updated successfully', task: yield task_1.TaskModel.getTaskId(id) });
                return res.status(202).json({ msg: `Task not found` });
            }
            catch (error) {
                return res.status(500).json({ Error: constantes_1.default.ERROR_SERVER });
            }
        });
    }
    static modifyUser({ body, params }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { newPassword } = body;
                const updateUser = yield userSql_1.UserModel.updateUser(body, params.id, newPassword);
                if (updateUser instanceof user_1.User) {
                    return res.status(200).json({ user: updateUser, tasks: yield task_1.TaskModel.userAndTask(updateUser.user_id) });
                }
                return res.status(400).json({ Error: updateUser });
            }
            catch (error) {
                return res.status(500).json({ Error: constantes_1.default.ERROR_SERVER });
            }
        });
    }
    static deleteUser({ params }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = params;
                if ((yield userSql_1.UserModel.deleteUser(id)) > 0)
                    return res.status(200).json({ msg: `User delete successfully` });
                return res.status(203).json({ Error: `User not found` });
            }
            catch (error) {
                return res.status(500).json({ Error: constantes_1.default.ERROR_SERVER });
            }
        });
    }
    static confirmPassword({ params, body }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userFind = yield userSql_1.UserModel.getUserIdMysql(params.id);
                if (userFind instanceof user_1.User) {
                    const checkedPasswordUser = {
                        email: userFind.email,
                        password: body.password
                    };
                    if (yield userSql_1.UserModel.loginUserMysql(checkedPasswordUser)) {
                        return res.status(200).json({ msg: 'Password correct', found: true });
                    }
                }
                return res.status(400).json({ msg: `User ${constantes_1.default.NOT_FOUND}`, found: false });
            }
            catch (error) {
                return res.status(500).json({ Error: constantes_1.default.ERROR_SERVER });
            }
        });
    }
    static updateImage({ body, params, file }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log({ body, params: params.id, file });
            if (file) {
                (0, auth_1.saveImage)(file, params.id);
            }
            return res.status(200).json({});
        });
    }
}
exports.UserServiceApp = UserServiceApp;
