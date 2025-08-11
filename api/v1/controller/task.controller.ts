import Task from "../../v1/models/task.model.ts";
import { Request, Response } from "express";
export const index = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({ deleted: false }); // Sử dụng await để lấy dữ liệu
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};
export const detail = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findOne({ deleted: false, _id: taskId }); // Sử dụng await để lấy dữ liệu
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};
