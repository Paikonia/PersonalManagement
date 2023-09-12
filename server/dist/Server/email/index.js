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
exports.sendResetCode = exports.sendConfirmCode = void 0;
const nodemailer_1 = require("nodemailer");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const email_user = process.env.EMAIL_USER;
const email_pass = process.env.PASS;
console.log(email_user, email_pass);
const transporter = (0, nodemailer_1.createTransport)({
    host: "smtp.zoho.com",
    port: 587,
    secure: false,
    auth: {
        user: "aikospersonalmanagement@aikosnotes.info",
        pass: "NQJgGTcK0bza",
    },
});
const sendConfirmCode = ({ email, name, code }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(email, name, code);
        return yield transporter.sendMail({
            from: '"Aikos Personal Management" <aikospersonalmanagement@aikosnotes.info>',
            to: email,
            subject: "Confirmation Email",
            text: `Hello ${name},
      Welcome to the Aikos personal management App. You please enter the code to confirm your email.
      Code: ${code}
      Best regards.`,
        });
    }
    catch (e) {
        const error = {
            status: 500,
            name: "Mailer Error",
            message: e.message,
        };
        throw error;
    }
});
exports.sendConfirmCode = sendConfirmCode;
const confirmAccountRegistration = (name, email, role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield transporter.sendMail({
            from: '"Chrysalis Support" <support@aikosnotes.info>',
            to: email,
            subject: "Confirmation of activation",
            text: `Hello ${name},\n
        This email is to confirm that you have successfully registered to our database.        
        You will access resources as a ${role} in the school.
      `,
        });
    }
    catch (e) {
        throw e;
    }
});
const sendResetCode = (code, email, link, name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield transporter.sendMail({
            from: '"Aikos Personal Management" <aikospersonalmanagement@aikosnotes.info>',
            to: email,
            subject: "Confirmation Email",
            text: `Hello ${name},
      You have request for a password reset. Your reset code is: ${code}.

      You can also use the link: ${link} to reset your password.

      If you did not request for a password change, please ignre this email
      `,
        });
    }
    catch (e) {
        throw e;
    }
});
exports.sendResetCode = sendResetCode;
