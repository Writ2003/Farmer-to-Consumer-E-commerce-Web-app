import express from 'express'
import cors from "cors";
import cookieParser from "cookie-parser";
import razorpay from "razorpay";
const app = express();

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit : "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

//routes

import userRouter from "./routes/user.routes.js"
import productRouter from "./routes/product.routes.js"
import cartRouter from "./routes/cart.routes.js"
import paymentRouter from "./routes/payment.routes.js"
//routes declaration

app.use("/api/v1/user",userRouter);
app.use("/api/v1/product",productRouter);
app.use("api/v1/cart",cartRouter);
app.use("/api/v1/payment",paymentRouter);

export { app, instance };