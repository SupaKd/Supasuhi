import { Router } from "express";

import {
	add,
	getAll,
    getBySearch,
	getOne,
    remove,
    update,
} from "../controllers/product.controller.js";
import verifyToken from "../middlewares/verifyToken.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = Router()

router.post("/", verifyToken, isAdmin, add);

router.get("/", getAll );
router.get("/search", getBySearch );
router.get("/:id", getOne );

router.patch("/:id", verifyToken, isAdmin,  update );

router.delete("/:id", verifyToken, isAdmin,  remove );

export default router