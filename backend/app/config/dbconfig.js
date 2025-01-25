import mongoose from "mongoose";

function dbconnection() {
  mongoose.connect("mongodb://localhost:27017/task");

  const connection = mongoose.connection;

  connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
  });
}

export default dbconnection;
