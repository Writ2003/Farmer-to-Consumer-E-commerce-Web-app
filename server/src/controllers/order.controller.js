import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Address } from "../models/address.models.js";
import { Cart } from "../models/cart.models.js";

const getUserAddress = asyncHandler(async(req,res)=>{
    const {userId} = req.body?._id; 
    const address = await Address.aggregate([
        {
            $match:{
                userId:userId
            }
        },
        {
            $lookup:{
                from:"users",
                foreignField:"_Id",
                localField:"userId",
                as:"userDetails"
            },
            pipeline:[
                {
                    $project:{
                        fullname: 1,
                        email: 1
                    }
                }
            ]
        },
        {
            $addFields:{
                addressdetails:{
                    $first:"$userDetails"
                }
            }
        }
    ])

    if(!address?.length) throw new ApiError(404,"Address doen't exist!");
    return res.status(200).json(
        new ApiResponse(201,"User address details sent successfully",address[0])
    )
})

const getCart = asyncHandler(async(req,res)=>{
    const {userId} = req.user?._id;
    const cart = await Cart.find({userId});
    if(!cart) throw new ApiError(404,"Cart not found!");
    return res.status(200).json(
        new ApiResponse(201,"Cart sent successfully!",cart)
    )
})

export {getUserAddress, getCart}