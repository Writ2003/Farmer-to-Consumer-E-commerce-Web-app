import mongoose, { Schema } from "mongoose";

const orderDetailsSchema = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    total : {
        type : Number,
        default : 0,
        required : true
    },
    paymentId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "PaymentDetails"
    },
}, { timestamps : true })

export const OrderDetail = mongoose.model("OrderDetail", orderDetailsSchema)