import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as database from "./config/database.ts";
import Task from "./models/task.model.ts";
dotenv.config();
database.connect();
const app: Express = express();
const port: number | string = process.env.PORT || 3000;
// Route để lấy danh sách tasks
app.get("/tasks", async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({ deleted: false }); // Sử dụng await để lấy dữ liệu
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
});
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
