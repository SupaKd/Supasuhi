import { Router } from "express";

import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import productRoutes from "./product.routes.js";
import categoryRoutes from "./category.routes.js";
import adminRoutes from "./admin.routes.js";

import verifyToken from "../middlewares/verifyToken.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", verifyToken, userRoutes);
router.use("/category", categoryRoutes);
router.use("/products", productRoutes);
router.use("/admin", verifyToken, isAdmin, adminRoutes);

export default router;
