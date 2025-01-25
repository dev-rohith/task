import app from "./app/app.js";
import dbconnection from "./app/config/dbconfig.js";
import { configDotenv } from "dotenv";

configDotenv({ path: "./.env" });

dbconnection();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
