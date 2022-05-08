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
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const express_session_1 = __importDefault(require("express-session"));
const mongoose_1 = __importDefault(require("mongoose"));
const AuthRouter_1 = require("./apis/auth/AuthRouter");
const HomeRouter_1 = require("./apis/HomeRouter");
class App {
    constructor(port, frontendURI) {
        this.DEFAULT_FRONTEND_URL = process.env.DEFAULT_FRONTEND_URL;
        this.DEFAULT_PORT = 3000;
        this.app = (0, express_1.default)();
        this.server = http_1.default.createServer(this.app);
        this.port = this.DEFAULT_PORT || port;
        this.frontendURI = frontendURI !== null && frontendURI !== void 0 ? frontendURI : this.DEFAULT_FRONTEND_URL;
        this.middlewares();
        this.initializeRoutes();
        this.database();
    }
    middlewares() {
        //! Giving access to frontend 
        this.app.use((0, cors_1.default)({ credentials: true, origin: [this.DEFAULT_FRONTEND_URL] }));
        //! For extracting objects from json data in to req.body
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        //! For fetching files from frontend we make it a static directory
        this.app.use('/public', express_1.default.static(path_1.default.join('./public')));
        //^(connect-mongo + express-session) managing session
        this.app.use((0, express_session_1.default)({
            secret: process.env.COOKIE_SECRET,
            resave: false,
            saveUninitialized: false,
            store: connect_mongo_1.default.create({
                mongoUrl: process.env.MONGODB_URL
            }),
            cookie: { maxAge: 100 * 60 * 60 * 24 }
        }));
    }
    initializeRoutes() {
        this.app.use("/home", new HomeRouter_1.HomeRouter().router);
        this.app.use("/auth", new AuthRouter_1.AuthRouter().router);
    }
    Application_Bootstrap() {
        //! Starting server
        this.server.listen(this.port, () => {
            console.log(`✔ Express server running on port : ${this.port}\n${this.frontendURI} is allowed to be used your Front-End.`);
            console.log("Please wait while the server is being connected to the database....");
        });
    }
    database() {
        return __awaiter(this, void 0, void 0, function* () {
            let databaseURI = process.env.MONGODB_URL;
            mongoose_1.default.connect(databaseURI)
                .then(() => {
                console.log("✔ Database(MongoDB) connection has been established successfully!");
            })
                .catch((error) => {
                console.log(error + "\n❌ Database connection failed..");
            });
        });
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map