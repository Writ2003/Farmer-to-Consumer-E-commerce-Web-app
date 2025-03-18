import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { addProducts,updateProduct,addToCart } from "../controllers/product.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/add").post(
    upload.fields([
        {
            name:"productImage",
            maxCount:3
        }
    ]),
addProducts);
router.route("/update").patch(verifyJWT,updateProduct);
router.route("/addToCart").post(verifyJWT,addToCart);

export default router