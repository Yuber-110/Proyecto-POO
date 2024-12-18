import { Router } from "express";
import mongoose from "mongoose";

export const router = Router();

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    nombre: String,
    apellido: String,
  })
);

// obtiene la lista de usuarios
router.get("/", function (req, res) {
  User.find()
    .then((users) => {
      res.json({ data: users });
    })
    .catch((error) => {
      res.status(500).json({ error: "Error al obtener la lista de usuarios", detalle: error.message });
    });
});

// obtiene un usuario específico por el ID
router.get("/:id", function (req, res) {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.json({ data: user });
      } else {
        res.status(404).json({ error: "Usuario no encontrado" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Error al obtener el usuario", detalle: error.message });
    });
});

// crea un nuevo usuario
router.post("/", function (req, res) {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.json({ mensaje: "Usuario creado exitosamente!" });
    })
    .catch((error) => {
      res.status(400).json({ error: "Error al crear el usuario", detalle: error.message });
    });
});

// actualiza un usuario existente
router.put("/:id", function (req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedUser) => {
      if (updatedUser) {
        res.json({ mensaje: "Usuario actualizado exitosamente!", data: updatedUser });
      } else {
        res.status(404).json({ error: "Usuario no encontrado" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Error al actualizar el usuario", detalle: error.message });
    });
});

// elimina un usuario existente
router.delete("/:id", function (req, res) {
  User.findByIdAndDelete(req.params.id)
    .then((deletedUser) => {
      if (deletedUser) {
        res.json({ mensaje: "Usuario eliminado exitosamente!" });
      } else {
        res.status(404).json({ error: "Usuario no encontrado" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Error al eliminar el usuario", detalle: error.message });
    });
});