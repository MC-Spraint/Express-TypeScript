"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmtpTransport = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const SmtpTransport = nodemailer_1.default.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.ID,
        pass: process.env.PASSWORD
    }
});
exports.SmtpTransport = SmtpTransport;
//# sourceMappingURL=SmtpTransport.js.map