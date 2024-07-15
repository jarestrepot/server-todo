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
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const conection_1 = __importDefault(require("../../db/conection"));
const route_1 = __importDefault(require("../../routes/user/route"));
class Server {
    constructor() {
        var _a;
        this.app = (0, express_1.default)();
        this.port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : '2023';
        this.midlewares();
        this.sequelize = conection_1.default;
        this.initDatabase();
        this.listen();
        this.routes();
    }
    initDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.sequelize.authenticate();
                console.log('Connection to the database has been established successfully. 🚀');
            }
            catch (error) {
                console.error('Unable to connect to the database:', error);
            }
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Listening server on port http://localhost:${this.port}`);
        });
    }
    routes() {
        this.app.disable('x-powered-by');
        const userCors = (0, cors_1.default)({
            origin: ['https://crmacdatatech.netlify.app', 'http://localhost:5173'],
            methods: ['GET', 'POST', 'PATCH', 'DELETE', 'UPDATE'],
            allowedHeaders: ['Content-Type', 'authorization']
        });
        // Define routes
        this.app.use('/user', userCors);
        this.app.use('/user', route_1.default);
    }
    /**
    * Función para parciar el json
    */
    midlewares() {
        this.app.use(express_1.default.json());
    }
}
exports.Server = Server;
