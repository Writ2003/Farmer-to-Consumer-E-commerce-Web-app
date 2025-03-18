import { Router } from "express";
import { orderPayment, paymentVerification } from "../controllers/payment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import crypto from "crypto" 
const router = Router();

router.route("/makePayment").post(verifyJWT, orderPayment)
router.route("/paymentVerification").post(verifyJWT,paymentVerification)
export default router