var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import md5 from "md5";
import User from '../models/user.model.js';
import Otp from '../models/otp.model.js';
import { generateAndSendOtp } from '../../../helpers/otpGenerator.js';
import { generateRandomString } from '../../../helpers/generate.js';
export const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            fullName: req.body.fullName,
            email: req.body.email,
            password: md5(req.body.password),
            tokenUser: generateRandomString(20),
        };
        const userSave = new User(user);
        yield userSave.save();
        console.log(userSave);
        const subject = "Mã xác thực đăng ký tài khoản";
        yield generateAndSendOtp(userSave.id, subject, req.body.email);
        res.cookie("userId", userSave.id);
        return res.json({
            code: 200,
            message: "Tạo tài khoản thành công",
            userId: userSave.id,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
export const auth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const otpRequest = req.body.otp;
        const otpRecord = yield Otp.findOne({ userId }).select("code expireAt");
        if (!otpRecord) {
            return res
                .status(400)
                .json({ message: "OTP không tồn tại hoặc đã hết hạn" });
        }
        if (otpRecord.expireAt < new Date()) {
            return res.status(400).json({ message: "Mã OTP đã hết hạn" });
        }
        if (otpRecord.code !== otpRequest) {
            return res.status(400).json({ message: "Mã OTP không chính xác" });
        }
        const user = yield User.findByIdAndUpdate(userId, { status: "active" }, { new: true });
        yield Otp.deleteMany({ userId });
        if (user) {
            res.cookie("tokenUser", user.tokenUser);
        }
        return res.json({
            code: 200,
            message: "Xác thực thành công",
            userToken: user === null || user === void 0 ? void 0 : user.tokenUser,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
});
export const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = yield User.findOne({
            email: email,
        }).select("tokenUser password");
        if (!user || md5(password) !== user.password) {
            return res.json({
                code: 400,
                message: "Sai mật khẩu hoặc tài khoản",
            });
        }
        res.cookie("tokenUser", user.tokenUser);
        return res.json({
            code: 200,
            message: "Đăng nhập thành công",
            userToken: user.tokenUser,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
});
export const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const user = yield User.findOne({ email }).select("id");
        if (!user) {
            return res.status(400).json({ message: "Email không tồn tại" });
        }
        const subject = "Mã xác thực quên mật khẩu";
        yield generateAndSendOtp(user.id, subject, email);
        return res.json({
            code: 200,
            message: "Lấy mã xác thực quên mật khẩu thành công",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
});
export const otpPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const otpRequest = req.body.otp;
        const otpRecord = yield Otp.findOne({ email }).select("code expireAt userId");
        if (!otpRecord) {
            return res
                .status(400)
                .json({ message: "OTP không tồn tại hoặc đã hết hạn" });
        }
        if (otpRecord.expireAt < new Date()) {
            return res.status(400).json({ message: "Mã OTP đã hết hạn" });
        }
        if (otpRecord.code !== otpRequest) {
            return res.status(400).json({ message: "Mã OTP không chính xác" });
        }
        yield Otp.deleteMany({ email });
        res.cookie("userId", otpRecord.userId);
        return res.json({
            code: 200,
            message: "Xác thực thành công",
            userId: otpRecord.userId,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
});
export const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, password } = req.body;
        const userRecord = yield User.findOne({
            _id: userId,
            deleted: false,
            status: "active",
        }).select("password tokenUser");
        if (!userRecord) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }
        if (md5(password) === userRecord.password) {
            return res.json({
                code: 400,
                message: "Mật khẩu này đã được dùng gần đây",
            });
        }
        yield userRecord.updateOne({ password: md5(password) });
        res.cookie("tokenUser", userRecord.tokenUser);
        return res.json({
            code: 200,
            message: "Đổi mật khẩu thành công",
            tokenUser: userRecord.tokenUser,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
});
export const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.cookies) {
            return res.json({
                code: 400,
                message: "Lỗi chưa đăng nhập!",
            });
        }
        const tokenUser = req.cookies.tokenUser;
        console.log(tokenUser);
        if (!tokenUser) {
            return res.json({
                code: 400,
                message: "Lỗi chưa đăng nhập!",
            });
        }
        const user = yield User.findOne({
            tokenUser: tokenUser,
        }).select("-password");
        if (!user) {
            return res.json({
                code: 400,
                message: "Có lỗi lấy thông tin người dùng!",
            });
        }
        res.json({
            code: 200,
            user: user,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
});
