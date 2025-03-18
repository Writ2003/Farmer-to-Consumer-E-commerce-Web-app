import mongoose, { Schema } from "mongoose";

const orderItemsSchema = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    cartId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Cart"
    },
    quantity : {
        type : Number,
        default : 0
    },
    shippingAddress : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Address"
    }
}, { timestamps : true })

export const OrderItem = mongoose.model("OrderItem", orderItemsSchema)