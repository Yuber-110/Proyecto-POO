import mongoose from "mongoose";

export function dbConnection() {
  return mongoose.connect(
    "mongodb+srv://basedatos:basedatos@cluster0.do4h6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
}
