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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeController = void 0;
const UsersModel_1 = require("../models/users/UsersModel");
class HomeController {
    constructor() { }
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let perPage = 2;
            if (req.query.name !== undefined && req.query.name !== null) {
                try {
                    let regex = new RegExp(String(req.query.name), 'i');
                    let total = yield UsersModel_1.UsersModel.count({ name: regex });
                    let pages = Math.ceil(total / perPage);
                    let pageNumber = (req.query.page === undefined) ? 1 : Number(req.query.page);
                    let startFrom = (pageNumber - 1) * perPage;
                    let usersPerPage = yield UsersModel_1.UsersModel.find({ name: regex })
                        .sort({ "age": req.query.sort === "dec" ? -1 : 1 })
                        .skip(startFrom)
                        .limit(perPage);
                    let resObj = { curUsers: usersPerPage, queries: "'page': number, 'name': string, 'sort': 'dec' for descending order", curPage: pageNumber, totalPages: pages, totalUsers: total };
                    return res.status(200).json({ status: "200", message: "Ok", data: resObj });
                }
                catch (err) {
                    return res.status(500).json({ status: "500", message: "Internal server error", data: null });
                }
            }
            else {
                try {
                    let total = yield UsersModel_1.UsersModel.count();
                    let pages = Math.ceil(total / perPage);
                    let pageNumber = (req.query.page === undefined) ? 1 : Number(req.query.page);
                    let startFrom = (pageNumber - 1) * perPage;
                    let usersPerPage = yield UsersModel_1.UsersModel.find({})
                        .sort({ "age": req.query.sort === "dec" ? -1 : 1 })
                        .skip(startFrom)
                        .limit(perPage);
                    let resObj = { curUsers: usersPerPage, queries: "'page': number, 'name': string, 'sort': 'dec' for descending order", curPage: pageNumber, totalPages: pages, totalUsers: total };
                    return res.status(200).json({ status: "200", message: "Ok", data: resObj });
                }
                catch (err) {
                    return res.status(500).json({ status: "500", message: "Internal server error", data: null });
                }
            }
        });
    }
    addUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.status(200).json({ status: "406", message: "API is under construction", data: null });
        });
    }
}
exports.HomeController = HomeController;
//# sourceMappingURL=HomeController.js.map