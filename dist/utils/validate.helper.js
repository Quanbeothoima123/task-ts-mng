var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from '../api/v1/models/user.model.js';
export const validateEmail = (email_1, ...args_1) => __awaiter(void 0, [email_1, ...args_1], void 0, function* (email, options = {}) {
    const { required = true, mustExist = false, mustNotExist = false } = options;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!email || email.trim() === "") {
        if (required)
            return "Vui lòng nhập email";
        return null;
    }
    if (!emailRegex.test(email)) {
        return "Email không hợp lệ";
    }
    if (mustExist) {
        const user = yield User.findOne({
            email,
            deleted: false,
            status: "active",
        });
        if (!user) {
            return "Email không tồn tại trên hệ thống hoặc đã bị khóa";
        }
    }
    if (mustNotExist) {
        const user = yield User.findOne({ email });
        if (user) {
            return "Email đã tồn tại trên hệ thống";
        }
    }
    return null;
});
