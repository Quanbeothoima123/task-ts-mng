import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as database from "./config/database.ts";
import mainV1Routes from "./api/v1/routes/index.route.ts";
import bodyParser from "body-parser";
dotenv.config();
database.connect();
const app: Express = express();
app.use(bodyParser.json());
const port: number | string = process.env.PORT || 3000;
// Route để lấy danh sách tasks
mainV1Routes(app);
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
