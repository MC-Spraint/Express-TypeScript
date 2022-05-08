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
require("dotenv/config");
const UsersModel_1 = require("./models/users/UsersModel");
const mongoose_1 = __importDefault(require("mongoose"));
const db = process.env.MONGODB_URL;
//!Connecting MongoDB Atlas with Mongoose...        
class Seeder {
    constructor() {
        this.db = process.env.MONGODB_URL;
        this.users = [
            new UsersModel_1.UsersModel({
                name: "Shubhankar Das",
                email: "a@gmail.com",
                password: "test11",
                age: 30,
                status: true,
                role: "admin"
            }),
            new UsersModel_1.UsersModel({
                name: "Avishek Mandal",
                email: "a@abcd.com",
                password: "test21",
                age: 28,
                status: true,
                role: "admin"
            }),
            new UsersModel_1.UsersModel({
                name: "Tanmoy Sarkar",
                email: "ab@aar.com",
                password: "test31",
                age: 26,
                status: true,
                role: "admin"
            }),
            new UsersModel_1.UsersModel({
                name: "Riya",
                email: "abc@aj.com",
                password: "test41",
                age: 29,
                status: false,
                role: "customer"
            }),
            new UsersModel_1.UsersModel({
                name: "Kaizar",
                email: "abc@ab3.com",
                password: "test51",
                age: 27,
                status: false,
                role: "customer"
            })
        ];
    }
    addUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            let databaseURI = process.env.MONGODB_URL;
            mongoose_1.default.connect(databaseURI)
                .then(() => {
                let count = 0;
                let failedUsers = 0;
                for (let i = 0; i < this.users.length; i++) {
                    this.users[i].save((err, res) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            failedUsers++;
                            console.log(`${failedUsers} users failed to save`);
                        }
                        else {
                            count++;
                            console.log(`${count} users have been added`);
                            if (count === this.users.length) {
                                console.log("All ussers have been added successfully");
                                mongoose_1.default.disconnect();
                            }
                        }
                    }));
                }
            })
                .catch((error) => {
                console.log(error + "\n❌ Database connection failed..");
            });
        });
    }
}
const seeder = new Seeder();
seeder.addUsers();
//# sourceMappingURL=seed.js.map