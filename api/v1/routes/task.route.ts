import { Router, Request, Response } from "express";
const router: Router = Router();
import * as taskController from "../controller/task.controller.ts";
router.get("/", taskController.index);
router.get("/detail/:id", taskController.detail);

export const taskRoutes: Router = router;
