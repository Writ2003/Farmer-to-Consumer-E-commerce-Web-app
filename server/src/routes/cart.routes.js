import { Router } from "express";
import { removeFromCart, updateCart } from "../controllers/cart.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/removeProduct").post(verifyJWT,removeFromCart);
router.route("/updateCart").post(verifyJWT,updateCart);
export default router