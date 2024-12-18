import express from "express";

import { router } from "./routes";
import { dbConnection } from "./mongo";

// creación de la aplicación de servidor
const app = express();

// middlewares
app.use(express.json());

// rutas - endpoints de la API-------------------------
app.use(router);

// aplicación escuchando en el puerto 3000
app.listen(3000, function () {
  console.log("Server running on port 3000");
});

dbConnection().then(function () {
  console.log("Connected to MongoDB!");
});
