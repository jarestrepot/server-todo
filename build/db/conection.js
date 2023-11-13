"use strict";
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = (_a = process.env.MYSQL_ADDON_DB) !== null && _a !== void 0 ? _a : 'todolistapp';
const root = (_b = process.env.MYSQL_ADDON_USER) !== null && _b !== void 0 ? _b : 'root';
const password = (_c = process.env.MYSQL_ADDON_PASSWORD) !== null && _c !== void 0 ? _c : 'aplicaciones';
const hotsBD = (_d = process.env.MYSQL_ADDON_HOST) !== null && _d !== void 0 ? _d : 'localhost';
const portDB = (_e = process.env.MYSQL_ADDON_PORT) !== null && _e !== void 0 ? _e : 3306;
const sequelizeConnect = new sequelize_1.Sequelize(db, root, password, {
    host: hotsBD,
    dialect: 'mysql',
    port: 3306
});
exports.default = sequelizeConnect;
