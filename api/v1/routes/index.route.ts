import { taskRoutes } from "./task.route.ts";
import { Express } from "express";
import { requireAuth } from "../../../middlewares/auth.middleware.ts";
const mainV1Routes = (app: Express) => {
  const version: String = "/api/v1";
  app.use(version + "/tasks", requireAuth, taskRoutes);
};
export default mainV1Routes;
