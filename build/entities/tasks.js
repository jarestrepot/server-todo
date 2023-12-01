"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const sequelize_1 = require("sequelize");
const conection_1 = __importDefault(require("../db/conection"));
const category_1 = require("./category");
const importanceTask_1 = require("./importanceTask");
const status_1 = require("./status");
const user_1 = require("./user");
class Task extends sequelize_1.Model {
}
exports.Task = Task;
Task.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        validate: {
            isInt: true
        }
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: false
        }
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 8,
            max: 255,
            notNull: false
        }
    },
    category: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'Category',
            key: 'code'
        }
    },
    importance: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'Importance',
            key: 'code'
        }
    },
    status: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'Status',
            key: 'code'
        }
    },
    user_ref: {
        type: sequelize_1.DataTypes.STRING,
        references: {
            model: 'User',
            key: 'user_id'
        }
    },
    archived: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 0,
        allowNull: true,
    }
}, {
    sequelize: conection_1.default,
    tableName: 'tasks'
});
Task.belongsTo(category_1.Category, {
    foreignKey: 'category',
    as: 'taskCategory'
});
Task.belongsTo(importanceTask_1.Importance, {
    foreignKey: 'importance',
    as: 'taskImportance'
});
Task.belongsTo(status_1.Status, {
    foreignKey: 'status',
    as: 'taskStatus'
});
Task.belongsTo(user_1.User, {
    foreignKey: 'user_ref',
    as: 'user'
});
