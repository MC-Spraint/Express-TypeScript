"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../auth/AuthController");
//!This class will be used as a reference
class AuthRouter {
    constructor() {
        this.router = express_1.default.Router({ strict: true });
        this.initRoutes();
    }
    initRoutes() {
        let handler = new AuthController_1.AuthController();
        this.router.post('/register', (req, res, next) => { return handler.register(req, res, next); });
        this.router.get('/verify', (req, res, next) => { return handler.verify(req, res, next); });
    }
}
exports.AuthRouter = AuthRouter;
//# sourceMappingURL=AuthRouter.js.map