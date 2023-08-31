import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { User } from "./models/user";
import routes from "./routes/index";

const app = express();
app.use(routes);
app.use(bodyParser.json());

// Use the routes middleware
app.use("/api", routes);

const DBUrl = "mongodb://127.0.0.1:27017";
// Connect to MongoDB
mongoose
  .connect(DBUrl)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(`Error in DB connection : ${err}`))
  .finally(() => console.log("This is finally block of code"));

export default app;
