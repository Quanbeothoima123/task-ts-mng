var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { validateEmail } from "../../utils/validate.helper";
import User from "../../api/v1/models/user.model";
export const validateRegisterUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, password } = req.body;
    const errors = [];
    if (!fullName || fullName.trim() === "") {
        errors.push({ field: "fullName", message: "Vui lòng nhập họ tên" });
    }
    const emailError = yield validateEmail(email, { mustNotExist: true });
    if (emailError) {
        errors.push({ field: "email", message: emailError });
    }
    if (!password || password.trim() === "") {
        errors.push({ field: "password", message: "Vui lòng nhập mật khẩu" });
    }
    else if (password.length < 6) {
        errors.push({
            field: "password",
            message: "Mật khẩu phải có ít nhất 6 ký tự",
        });
    }
    if (errors.length > 0) {
        return res.status(422).json({
            success: false,
            message: "Dữ liệu đăng ký không hợp lệ",
            errors,
        });
    }
    next();
});
export const validateLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const errors = [];
    const emailError = yield validateEmail(email, { mustNotExist: false });
    if (emailError) {
        errors.push({ field: "email", message: emailError });
    }
    if (errors.length > 0) {
        return res.status(422).json({
            success: false,
            message: "Đăng nhập không thành công",
            errors,
        });
    }
    next();
});
export const validateForgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const errors = [];
    const emailError = yield validateEmail(email, { mustNotExist: false });
    if (emailError) {
        errors.push({ field: "email", message: emailError });
    }
    if (errors.length > 0) {
        return res.status(422).json({
            success: false,
            message: "Dữ liệu không hợp lệ",
            errors,
        });
    }
    next();
});
export const validateOtpPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    const errors = [];
    const emailError = yield validateEmail(email, { mustNotExist: false });
    if (emailError) {
        errors.push({ field: "email", message: emailError });
    }
    if (!otp || otp.trim() === "") {
        errors.push({ field: "otp", message: "Vui lòng nhập otp!" });
    }
    if (errors.length > 0) {
        return res.status(422).json({
            success: false,
            message: "Dữ liệu không hợp lệ",
            errors,
        });
    }
    next();
});
export const validateResetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, password } = req.body;
    const errors = [];
    if (!userId || userId.trim() === "") {
        errors.push({ field: "userId", message: "Vui lòng gửi lên userId!" });
    }
    else {
        const checkUserExist = yield User.findOne({
            _id: userId,
            deleted: false,
            status: "active",
        });
        if (!checkUserExist) {
            errors.push({ field: "userId", message: "Tài khoản không tồn tại!" });
        }
    }
    if (!password || password.trim() === "") {
        errors.push({ field: "password", message: "Vui lòng nhập mật khẩu" });
    }
    else if (password.length < 6) {
        errors.push({
            field: "password",
            message: "Mật khẩu phải có ít nhất 6 ký tự",
        });
    }
    if (errors.length > 0) {
        return res.status(422).json({
            success: false,
            message: "Dữ liệu không hợp lệ",
            errors,
        });
    }
    next();
});
