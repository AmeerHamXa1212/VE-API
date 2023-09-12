import app from "./app";
import mongoose from "mongoose";

const port = process.env.port;
console.log(port);
mongoose.set("strictQuery", true);
const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
