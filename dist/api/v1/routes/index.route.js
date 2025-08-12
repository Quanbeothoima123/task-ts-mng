import { taskRoutes } from './task.route.js';
import { userRoutes } from './user.route.js';
import { requireAuth } from '../../../middlewares/auth.middleware.js';
const mainV1Routes = (app) => {
    const version = "/api/v1";
    app.use(version + "/tasks", requireAuth, taskRoutes);
    app.use(version + "/user", userRoutes);
};
export default mainV1Routes;
