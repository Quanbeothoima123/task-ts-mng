import express from "express";
import dotenv from "dotenv";
import * as database from './config/database.js';
import mainV1Routes from './api/v1/routes/index.route.js';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
database.connect();
const app = express();
app.use(bodyParser.json());
app.use(cookieParser(""));
app.use(cors());
const port = process.env.PORT || 3000;
mainV1Routes(app);
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
