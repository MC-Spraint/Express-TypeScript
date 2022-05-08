import nodemailer from "nodemailer";
const SmtpTransport:any = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.ID as string,
        pass: process.env.PASSWORD as string
    }
})

export {SmtpTransport};