import { taskRoutes } from "./task.route.ts";
import { Express } from "express";
const mainV1Routes = (app: Express) => {
  const version: String = "/api/v1";
  app.use(version + "/tasks", taskRoutes);
};
export default mainV1Routes;
