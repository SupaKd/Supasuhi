import express from "express";
import { getAll, remove } from "../controllers/user.controller.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router();

router.get("/", isAdmin, getAll); // Route pour récupérer tous les utilisateurs
router.delete("/:userId", isAdmin, remove); // Route pour supprimer un utilisateur par son ID

export default router;