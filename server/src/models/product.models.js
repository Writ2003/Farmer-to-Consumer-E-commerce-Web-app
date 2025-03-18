import mongoose,{Schema} from "mongoose";

const productSchema = new Schema({
    /*categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category"
    },*/
    ownerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        default : 0,
        required : true
    },
    stock : {
        type : Number,
        default : 0,
        required : true
    },
    productDescription : {
        type : String,
        required : true
    },
    minQuantity : {
        type : Number,
        required : true
    },
    productImage : {
        type : String,
        required : true
    }
}, { timestamps : true });

export const Product = mongoose.model("Product", productSchema);