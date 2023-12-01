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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModel = void 0;
const sequelize_1 = require("sequelize");
const category_1 = require("../../entities/category");
const importanceTask_1 = require("../../entities/importanceTask");
const status_1 = require("../../entities/status");
const tasks_1 = require("../../entities/tasks");
const conditions_1 = __importDefault(require("../conditions/conditions"));
const constantes_1 = __importDefault(require("../../config/constantes"));
class TaskModel {
}
exports.TaskModel = TaskModel;
_a = TaskModel;
TaskModel.createTask = ({ title, description, category, importance, status }, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield tasks_1.Task.create({
            title,
            description,
            category: Number(category),
            importance: Number(importance),
            status: Number(status),
            user_ref: user_id,
            archived: 0
        });
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
TaskModel.userAndTask = (user_ref) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasksUser = yield tasks_1.Task.findAll({
            attributes: [
                'id',
                'title',
                'description',
                [(0, sequelize_1.literal)('taskCategory.name'), 'Category'],
                [(0, sequelize_1.literal)('taskImportance.name'), 'Importance'],
                [(0, sequelize_1.literal)('taskStatus.name'), 'Status'],
                'archived'
            ],
            where: {
                user_ref
            },
            include: [
                {
                    model: category_1.Category,
                    as: 'taskCategory',
                    attributes: []
                },
                {
                    model: importanceTask_1.Importance,
                    as: 'taskImportance',
                    attributes: []
                },
                {
                    model: status_1.Status,
                    as: 'taskStatus',
                    attributes: []
                }
            ],
            raw: true
        });
        if (tasksUser)
            return tasksUser;
        return [];
    }
    catch (error) {
        console.log('Error: ', error);
        return [];
    }
});
TaskModel.deleteTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tasks_1.Task.destroy(conditions_1.default.queryWhere({ id }));
});
TaskModel.updateTask = ({ id, title, description, category, importance, status }, user_ref) => __awaiter(void 0, void 0, void 0, function* () {
    const [affectedCount] = yield tasks_1.Task.update({ title, description, category, importance, status }, { where: {
            [sequelize_1.Op.and]: [
                {
                    id
                },
                {
                    user_ref
                }
            ]
        }
    });
    return affectedCount;
});
TaskModel.archivedTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const task = yield tasks_1.Task.findByPk(id);
    if (!task) {
        return constantes_1.default.NOT_FOUND;
    }
    const currentArchivedValue = (_b = task.archived) !== null && _b !== void 0 ? _b : 0;
    const [affectedCount] = yield tasks_1.Task.update({
        archived: currentArchivedValue === 0 ? 1 : 0
    }, { where: { id } });
    return affectedCount;
});
TaskModel.getTaskId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    return (_c = yield tasks_1.Task.findOne({
        attributes: [
            'id',
            'title',
            'description',
            [(0, sequelize_1.literal)('taskCategory.name'), 'Category'],
            [(0, sequelize_1.literal)('taskImportance.name'), 'Importance'],
            [(0, sequelize_1.literal)('taskStatus.name'), 'Status'],
            'archived',
        ],
        where: { id },
        include: [
            {
                model: category_1.Category,
                as: 'taskCategory',
                attributes: []
            },
            {
                model: importanceTask_1.Importance,
                as: 'taskImportance',
                attributes: []
            },
            {
                model: status_1.Status,
                as: 'taskStatus',
                attributes: []
            }
        ],
        raw: true
    })) !== null && _c !== void 0 ? _c : [];
});
