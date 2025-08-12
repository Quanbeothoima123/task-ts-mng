var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
import Status from '../../api/v1/models/status.model.js';
import Task from '../../api/v1/models/task.model.js';
import User from '../../api/v1/models/user.model.js';
export const validateCreateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, status, content, timeStart, timeFinish, listUser, parentTaskId, } = req.body;
    const errors = [];
    if (!title || title.trim() === "") {
        errors.push({ field: "title", message: "Vui lòng nhập tiêu đề" });
    }
    if (!status || !mongoose.Types.ObjectId.isValid(status)) {
        errors.push({ field: "status", message: "Trạng thái không hợp lệ" });
    }
    else {
        const statusExists = yield Status.exists({ _id: status, deleted: false });
        if (!statusExists) {
            errors.push({ field: "status", message: "Trạng thái không tồn tại" });
        }
    }
    if (content !== undefined && typeof content !== "string") {
        errors.push({ field: "content", message: "Nội dung không hợp lệ" });
    }
    if (timeStart !== undefined && isNaN(Date.parse(timeStart))) {
        errors.push({ field: "timeStart", message: "Ngày bắt đầu không hợp lệ" });
    }
    if (timeFinish !== undefined && isNaN(Date.parse(timeFinish))) {
        errors.push({ field: "timeFinish", message: "Ngày kết thúc không hợp lệ" });
    }
    if (timeStart !== undefined &&
        timeFinish !== undefined &&
        new Date(timeStart) > new Date(timeFinish)) {
        errors.push({
            field: "timeRange",
            message: "Ngày bắt đầu phải nhỏ hơn ngày kết thúc",
        });
    }
    if (listUser !== undefined) {
        if (!Array.isArray(listUser)) {
            errors.push({
                field: "listUser",
                message: "Danh sách người dùng phải là mảng",
            });
        }
        else {
            const invalidIds = listUser.filter((id) => !mongoose.Types.ObjectId.isValid(id));
            if (invalidIds.length > 0) {
                errors.push({
                    field: "listUser",
                    message: "Một hoặc nhiều ID người dùng không hợp lệ",
                });
            }
            else {
                const usersCount = yield User.countDocuments({
                    _id: { $in: listUser },
                    deleted: false,
                });
                if (usersCount !== listUser.length) {
                    errors.push({
                        field: "listUser",
                        message: "Một hoặc nhiều người dùng không tồn tại",
                    });
                }
            }
        }
    }
    if (parentTaskId !== undefined) {
        if (!mongoose.Types.ObjectId.isValid(parentTaskId)) {
            errors.push({
                field: "parentTaskId",
                message: "parentTaskId không hợp lệ",
            });
        }
        else {
            const parentExists = yield Task.exists({
                _id: parentTaskId,
                deleted: false,
            });
            if (!parentExists) {
                errors.push({
                    field: "parentTaskId",
                    message: "parentTaskId không tồn tại",
                });
            }
        }
    }
    if (errors.length > 0) {
        res.status(422).json({
            success: false,
            message: "Dữ liệu gửi lên không hợp lệ",
            errors,
        });
        return;
    }
    next();
});
export const validateEditTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, status, content, timeStart, timeFinish } = req.body;
    const errors = [];
    if (title !== undefined && title.trim() === "") {
        errors.push({ field: "title", message: "Tiêu đề không được để trống" });
    }
    const statusList = [
        "6891756913ad616de04c7382",
        "6891756913ad616de04c7383",
        "6891756913ad616de04c7384",
        "6891756913ad616de04c7385",
        "6891756913ad616de04c7386",
    ];
    if (status !== undefined && !statusList.includes(status)) {
        errors.push({ field: "status", message: "Trạng thái không hợp lệ" });
    }
    if (content !== undefined && typeof content !== "string") {
        errors.push({ field: "content", message: "Nội dung không hợp lệ" });
    }
    if (timeStart !== undefined && isNaN(Date.parse(timeStart))) {
        errors.push({ field: "timeStart", message: "Ngày bắt đầu không hợp lệ" });
    }
    if (timeFinish !== undefined && isNaN(Date.parse(timeFinish))) {
        errors.push({ field: "timeFinish", message: "Ngày kết thúc không hợp lệ" });
    }
    if (timeStart !== undefined &&
        timeFinish !== undefined &&
        new Date(timeStart) > new Date(timeFinish)) {
        errors.push({
            field: "timeRange",
            message: "Ngày bắt đầu phải nhỏ hơn ngày kết thúc",
        });
    }
    if (errors.length > 0) {
        res.status(422).json({
            success: false,
            message: "Dữ liệu cập nhật không hợp lệ",
            errors,
        });
        return;
    }
    next();
});
