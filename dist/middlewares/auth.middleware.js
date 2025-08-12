var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../api/v1/models/user.model";
export const requireAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res
                .status(401)
                .json({ code: 401, message: "Thiếu Authorization header" });
        }
        const tokenUser = authHeader.split(" ")[1];
        if (!tokenUser) {
            return res
                .status(400)
                .json({ code: 400, message: "Vui lòng gửi tokenUser!" });
        }
        const user = yield User.findOne({
            tokenUser: tokenUser,
            deleted: false,
            status: "active",
        });
        if (!user) {
            return res.status(401).json({ code: 401, message: "Token không hợp lệ" });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ code: 500, message: "Lỗi server" });
    }
});
