import { Router, Request, Response } from "express";
const router: Router = Router();
import Task from "../../../models/task.model.ts";
router.get("/", async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({ deleted: false }); // Sử dụng await để lấy dữ liệu
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
});
router.get("/detail/:id", async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findOne({ deleted: false, _id: taskId }); // Sử dụng await để lấy dữ liệu
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
});

export const taskRoutes: Router = router;
