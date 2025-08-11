import Task from "../../v1/models/task.model.ts";
import Status from "../models/status.model.ts";
import paginationHelper from "../../../helpers/pagination.ts";
import { Request, Response } from "express";
import { skip } from "node:test";
export const index = async (req: Request, res: Response) => {
  try {
    interface Find {
      deleted: boolean;
      status?: string;
    }
    // Find
    const find: Find = {
      deleted: false,
    };
    const status = await Status.find({
      deleted: false,
    }).select("_id name");
    if (req.query.status) {
      status.forEach((item) => {
        if (item.name == req.query.status?.toString()) {
          find.status = item.id;
        }
      });
    }

    interface Sort {
      [key: string]: 1 | -1;
    }
    // Phân trang
    const countTasks = await Task.countDocuments(find);
    let objectPagination = paginationHelper(
      {
        currentPage: 1,
        limitItems: 2,
        skip: 0,
      },
      req.query,
      countTasks
    );

    // Sort
    const sort: Sort = {};
    if (req.query.sortKey && req.query.sortValue) {
      const sortKey = req.query.sortKey as string;
      const sortValue = req.query.sortValue as string;

      // Kiểm tra sortKey hợp lệ
      const validKeys = ["title", "createdAt", "timeStart", "timeFinish"]; // Danh sách trường hợp lệ
      if (!validKeys.includes(sortKey)) {
        return res.status(500).json({ message: "sort key không hợp lệ" });
      }

      // Kiểm tra và ánh xạ sortValue
      if (sortValue === "asc") {
        sort[sortKey] = 1;
      } else if (sortValue === "desc") {
        sort[sortKey] = -1;
      } else {
        return res
          .status(500)
          .json({ message: "sort value chỉ gồm 2 giá trị asc và desc" });
      }
    }

    const tasks = await Task.find(find)
      .sort(sort)
      .limit(objectPagination.limitItems)
      .skip(objectPagination.skip); // Sử dụng await để lấy dữ liệu

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy dữ liệu task", error });
  }
};
export const detail = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findOne({ deleted: false, _id: taskId }); // Sử dụng await để lấy dữ liệu
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy dữ liệu task", error });
  }
};
