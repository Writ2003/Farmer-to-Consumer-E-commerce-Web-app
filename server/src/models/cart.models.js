import mongoose, { Schema } from "mongoose";

const cartItem = new Schema({
    productID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product"
    },
    price: {
        type : Number,
        required : true
    },
    quantity : {
        type: Number,
        required : true,
        default : 0
    }
})
const cartSchema = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    products : [cartItem],
    quantity : {
        type : Number,
        default : 0
    }
}, {timestamps : true})

export const Cart = mongoose.model("Cart", cartSchema);