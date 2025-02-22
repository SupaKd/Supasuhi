import { Router } from "express";

import {
	create,
	getAll,
	getOne,
	update,
	remove,
} from "../controllers/category.controller.js";
import verifyToken from "../middlewares/verifyToken.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = Router();

router.post("/", verifyToken, isAdmin, create);
router.get("/",  getAll);
router.get("/:id", getOne);
router.patch("/:id", update);
router.delete("/:id", remove);

export default router;
