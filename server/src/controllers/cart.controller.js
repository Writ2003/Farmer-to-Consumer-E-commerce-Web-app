import { asyncHandler } from "../utils/asyncHandler.js";
import { Cart } from "../models/cart.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { OrderItem } from "../models/orderItem.models.js";

const removeFromCart = asyncHandler(async(req,res)=>{
    const { productId } = req.body;
    const userId = req.user._id;

    if(!productId) throw new ApiError(401,"No product found!");
    if(!userId) throw new ApiError(401,"You are not authorized");

    const user = await User.findById(userId);
    if(!user) throw new ApiError(401,"No user found!");
    if(!user.cartID) throw new ApiError(401,"Cart is not available");
    const cart = await Cart.findById(user.cartID);
    cart.products.map(prods => prods.productID !== productId);
    cart = await cart.save();
    const index = cart.products.findIndex(prods => prods.productID === productId);
    if(index > -1) throw new ApiError(501,"Something went wrong! product couldn't be removed");
    return res.status(201).json(
        new ApiResponse(200,"Product removed successfully!",cart)
    )
})

const updateCart = asyncHandler(async(req,res)=>{
    const { productId , quantity } = req.body;
    const userid = req.user._id;
    if(!userid) throw new ApiError(401,"Unauthorized request");
    const cart = await Cart.findById({userId:userid});
    if(!cart) throw new ApiError(401,"Couldn't find any cart under this account");
    cart.products.map(prod => {
        if(prod.productID === productId){
            prod.quantity = quantity;
        }
        return prod;
    })
    cart = await cart.save();
    return res.status(201).json(
        new ApiResponse(200,"Updated cart details successfully!")
    )
})

const placeOrder = asyncHandler(async(req,res)=>{
    const { address } = req.body;
    const userid = req.user._id;
    const cart = Cart.findOne({userId : userid});
    if(!address) return res.redirect("/shippingAddress");
    if(!cart) throw new ApiError(501,"Something went wrong!");
    const orderItems = await OrderItem.create({
        userId : userid,
        cartId : cart._id,
        quantity : cart.quantity,
        shippingAddress : address
    })
    if(!orderItems) throw new ApiError(501,"Something went wrong!");
    return res.status(201).json(
        new ApiResponse(200,"Order items added successfully",orderItems)
    )
})

export { removeFromCart, updateCart, placeOrder }