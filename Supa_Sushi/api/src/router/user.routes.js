import { Router } from "express";
import { getInfos, update, remove } from "../controllers/user.controller.js";
import { getAllUserOrders, placeOrder, getUserOrderById } from "../controllers/order.controller.js";


const router = Router();

router.get("/", getInfos);
router.get("/orders", getAllUserOrders);
router.get("/order/:orderId", getUserOrderById);
router.post("/order", placeOrder);

router.patch("/", update);
router.delete("/", remove);

export default router;
