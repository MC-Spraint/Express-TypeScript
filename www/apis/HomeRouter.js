"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeRouter = void 0;
const express = __importStar(require("express"));
const HomeController_1 = require("./HomeController");
class HomeRouter {
    constructor() {
        this.router = express.Router();
        this.initRoutes();
    }
    initRoutes() {
        let handler = new HomeController_1.HomeController();
        this.router.get('/get_users', (req, res, next) => { return handler.getUsers(req, res, next); });
        this.router.post('/add_users', (req, res, next) => { return handler.addUsers(req, res, next); });
    }
}
exports.HomeRouter = HomeRouter;
//# sourceMappingURL=HomeRouter.js.map