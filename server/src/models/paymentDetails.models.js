import mongoose, { Schema } from "mongoose";

const paymentDetailsSchema = new Schema({
    usedId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    orderId : {
        type : String,
        required : true,
        unique : true    
    },
    paymentId:{
        type: String,
        required: true,
        unique:true
    },
    paymentSignature:{
        type:String,
        required:true,
        unique:true
    }
}, { timestamps : true })

export const PaymentDetail = mongoose.model("PaymentDetail", paymentDetailsSchema)