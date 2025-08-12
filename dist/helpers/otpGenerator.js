var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import Otp from '../api/v1/models/otp.model.js';
export const generateAndSendOtp = (userId_1, subject_1, ...args_1) => __awaiter(void 0, [userId_1, subject_1, ...args_1], void 0, function* (userId, subject, email = "") {
    const existingOtp = yield Otp.findOne({
        userId: userId,
        expireAt: { $gt: new Date() },
    });
    if (existingOtp) {
        throw new Error("Vui lòng chờ một lát trước khi yêu cầu lại mã OTP.");
    }
    const otpCode = otpGenerator.generate(6, {
        digits: true,
        alphabets: false,
        upperCase: false,
        specialChars: false,
    });
    const expireAt = new Date(Date.now() + 5 * 60 * 1000);
    yield Otp.create({
        userId,
        email,
        code: otpCode,
        expireAt,
    });
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    const html = `<p>Mã OTP của bạn là: <b>${otpCode}</b></p><p>Mã có hiệu lực trong 5 phút.</p>`;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        html: html,
    };
    yield transporter.sendMail(mailOptions);
});
