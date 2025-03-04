import express from "express";
import { getAll, remove } from "../controllers/user.controller.js";
import { updateOrderStatus, getAllUserOrders, getUserOrderById } from "../controllers/order.controller.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router();

// Routes pour les utilisateurs
router.get("/", isAdmin, getAll); // Route pour récupérer tous les utilisateurs
router.delete("/:userId", isAdmin, remove); // Route pour supprimer un utilisateur par son ID

// Routes pour les commandes
router.get("/orders", isAdmin, getAllUserOrders); // Route pour récupérer toutes les commandes des utilisateurs
router.get("/orders/:orderId", isAdmin, getUserOrderById); // Route pour récupérer une commande spécifique
router.put("/orders/:orderId/status", isAdmin, updateOrderStatus); // Route pour mettre à jour le statut d'une commande

export default router;
