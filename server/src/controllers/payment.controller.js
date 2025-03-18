import { asyncHandler } from "../utils/asyncHandler.js";
import { instance } from "../app.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import {PaymentDetail} from "../models/paymentDetails.models.js"

const orderPayment = asyncHandler(async(req,res)=>{
    const {amount} = req.body;
    const options = {
        amount:Number(amount)*100,
        currency:"INR"
    };
    const orderStatus = await instance.orders.create(options);
    return res.status(200).json(
        new ApiResponse(201,"Order created",orderStatus)
    )
})

const paymentVerification = asyncHandler(async(req,res)=>{
    const userId = req.user?._id;
    if(!userId) throw new ApiError(404,"User not found"); 
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;
    const generated_signature = hmac_sha256(razorpay_order_id + "|" + razorpay_payment_id, process.env.RAZORPAY_API_SECRET);

    if (generated_signature != razorpay_signature) {
        res.redirect(`/api/v1/paymentfailed?reference=${razorpay_payment_id}`);
        throw new ApiError(501,"Payment unsuccessful");
    }
    else {
        const paymentdetails = await PaymentDetail.create({
            userId,
            orderId:razorpay_order_id,
            paymentId:razorpay_payment_id,
            paymentSignature:razorpay_signature
        });
        if(!paymentdetails) throw new ApiError(501,"Something went wrong!");
        res.redirect(`/api/v1/paymentSuccess?reference=${razorpay_payment_id}`);
    }
    return res.status(200).json(
        new ApiResponse(201,"Payment Successful!",{})
    )
})

export {orderPayment, paymentVerification}