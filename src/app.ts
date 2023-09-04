import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { User } from "./models/user";
import routes from "./routes/index";
import { errorHandler } from "./middleware/errorHandler";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(routes);
app.use(bodyParser.json());
app.set("trust proxy", false);

// Use the routes middleware
app.use("/api", routes);

const DBConnectionString = process.env.DB_URL;
const Port = 5000;

if (!DBConnectionString) {
  throw new Error("DB_URL environment variable is not defined.");
}
if (!Port) {
  throw new Error("port environment variable is not defined.");
}
mongoose
  .connect(DBConnectionString)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(`Error in DB connection : ${err}`))
  .finally(() => console.log("This is finally block of code"));

app.use(errorHandler);
export default app;



