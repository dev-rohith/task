import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

const db = process.env.MONGO_URL;

function dbconnection() {
  mongoose.connect(db);

  const connection = mongoose.connection;

  connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
  });
}

export default dbconnection;
