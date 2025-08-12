var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Task from '../../v1/models/task.model.js';
import Status from '../models/status.model.js';
import paginationHelper from '../../../helpers/pagination.js';
import searchHelper from '../../../helpers/search.js';
import mongoose from "mongoose";
export const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const find = {
            deleted: false,
        };
        const status = yield Status.find({
            deleted: false,
        }).select("_id name");
        if (req.query.status) {
            status.forEach((item) => {
                var _a;
                if (item.name == ((_a = req.query.status) === null || _a === void 0 ? void 0 : _a.toString())) {
                    find.status = item.id;
                }
            });
        }
        const objectSearch = searchHelper(req.query);
        if (req.query.keyword) {
            find.title = objectSearch.regex;
        }
        const countTasks = yield Task.countDocuments(find);
        let objectPagination = paginationHelper({
            currentPage: 1,
            limitItems: 2,
            skip: 0,
        }, req.query, countTasks);
        const sort = {};
        if (req.query.sortKey && req.query.sortValue) {
            const sortKey = req.query.sortKey;
            const sortValue = req.query.sortValue;
            const validKeys = ["title", "createdAt", "timeStart", "timeFinish"];
            if (!validKeys.includes(sortKey)) {
                return res.status(500).json({ message: "sort key không hợp lệ" });
            }
            if (sortValue === "asc") {
                sort[sortKey] = 1;
            }
            else if (sortValue === "desc") {
                sort[sortKey] = -1;
            }
            else {
                return res
                    .status(500)
                    .json({ message: "sort value chỉ gồm 2 giá trị asc và desc" });
            }
        }
        const tasks = yield Task.find(find)
            .sort(sort)
            .limit(objectPagination.limitItems)
            .skip(objectPagination.skip);
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: "Lỗi lấy dữ liệu task", error });
    }
});
export const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const task = yield Task.findOne({ deleted: false, _id: taskId });
        res.json(task);
    }
    catch (error) {
        res.status(500).json({ message: "Lỗi lấy dữ liệu task", error });
    }
});
export const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idTask = req.params.id;
    const statusId = req.body.status;
    try {
        const checkStatusValidate = yield Status.findOne({ _id: statusId });
        const checkTaskValidate = yield Task.findOne({ _id: idTask });
        if (checkStatusValidate && checkTaskValidate) {
            yield Task.updateOne({ _id: idTask }, { status: statusId });
            return res.json({
                code: 200,
                message: "Cập nhật thành công trạng thái của task",
            });
        }
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Không tồn tại trạng thái hoặc task này!" });
    }
});
export const changeMulti = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = req.body.ids;
    const key = req.body.key;
    const value = req.body.value;
    let KEY;
    (function (KEY) {
        KEY["STATUS"] = "status";
        KEY["DELETED"] = "deleted";
        KEY["POSITION"] = "position";
        KEY["ACTIVE"] = "active";
        KEY["INACTIVE"] = "inactive";
    })(KEY || (KEY = {}));
    console.log("Nhận yêu cầu:", { ids, key, value });
    if (!Array.isArray(ids) || ids.length === 0 || !key) {
        return res.status(400).json({ message: "Dữ liệu đầu vào không hợp lệ" });
    }
    const validIds = ids.filter((id) => mongoose.Types.ObjectId.isValid(id));
    if (validIds.length === 0) {
        return res.status(400).json({ message: "Tất cả ID đều không hợp lệ" });
    }
    try {
        switch (key) {
            case KEY.STATUS: {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    return res.status(400).json({ message: "Status ID không hợp lệ" });
                }
                const checkStatus = yield Status.findOne({
                    _id: value,
                    deleted: false,
                });
                if (!checkStatus) {
                    return res
                        .status(404)
                        .json({ message: "Trạng thái không tồn tại trong hệ thống" });
                }
                yield Task.updateMany({ _id: { $in: validIds } }, { status: value });
                return res.json({
                    code: 200,
                    message: "Cập nhật trạng thái thành công",
                });
            }
            case KEY.DELETED: {
                const deletedValue = value === "true";
                yield Task.updateMany({ _id: { $in: validIds } }, { deleted: true });
                return res.json({
                    code: 200,
                    message: `Cập nhật deleted=${deletedValue} thành công`,
                });
            }
            default:
                return res.status(400).json({
                    message: `Không hỗ trợ cập nhật với key '${key}'`,
                });
        }
    }
    catch (error) {
        console.error("Lỗi khi cập nhật nhiều Task:", error);
        return res.status(500).json({
            message: "Đã có lỗi xảy ra từ server",
        });
    }
});
export const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                success: false,
                message: "Người dùng chưa được xác thực!",
            });
        }
        req.body.createdBy = req.user._id;
        const task = new Task(req.body);
        yield task.save();
        res.status(201).json({
            success: true,
            message: "Tạo task mới thành công!",
            data: task,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Tạo task mới thất bại!",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
export const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                success: false,
                message: "Người dùng chưa được xác thực!",
            });
        }
        const account_id = req.user.id;
        const updatedBy = {
            account_id: account_id,
            updatedAt: new Date(),
        };
        const taskId = req.params.id;
        yield Task.updateOne({
            _id: taskId,
            deleted: false,
        }, Object.assign(Object.assign({}, req.body), { $push: { updatedBy: updatedBy } }));
        return res.status(201).json({
            success: true,
            message: "Cập nhật task thành công!",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Cập nhật thất bại!",
        });
    }
});
