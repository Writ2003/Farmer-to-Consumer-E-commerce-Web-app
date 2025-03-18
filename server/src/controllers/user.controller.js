import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.models.js'
import { uploadOnCludinary } from "../utils/cloudinary.js"
import { ApiResponse } from '../utils/ApiResponse.js'
import jwt from "jsonwebtoken"
import { Address } from "../models/address.models.js"

const registerUser = asyncHandler(async(req,res) => {
    //Get user details from Frontend
    //Validation--not empty
    //Check if user already exits--checking through username and email
    //Check for images, check for avatar
    //Upload them to Cloudinary, check if the avtar is uploaded correctly
    //Create User object-- cretae entry in db
    //Remove password and Refresh Token field from response
    //Check for user creation
    //Return response

    const {fullname,username,email,password,userType} = req.body;

    if([fullname,email,username,password,userType].some((field) => field?.trim()==='')) throw new ApiError(400,'All fields are required');

    const existingUser = await User.findOne({
        $or:[{ username }, { email }]
    });
    if(existingUser) throw new ApiError(409, 'This Username or Email already exists, please try something different');

    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    console.log(coverImageLocalPath);
    if(!coverImageLocalPath) throw new ApiError(400, 'Cover Image is required');

    const coverimage = await uploadOnCludinary(coverImageLocalPath);
    if(!coverimage) throw new ApiError(500, "Couldn't upload cover image");

    const user = await User.create({
        fullname,
        coverImage:coverimage.url,
        email,
        password,
        username: username.toLowerCase(),
        userType
    })

    const createdUser = await User.findById(user._id).select(
        '-password -refreshToken'
    );

    if(!createdUser) throw new ApiError(500, "Something went wrong while registering the User");
    res.status(201).json(
        new ApiResponse(200,'User registered Successfully !',createdUser)
    )

})

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findOne(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generatAccessToken();

        user.refrehToken = refreshToken;
        await user.save({validateBeforeSave : false});

        return {accessToken,refreshToken};
    } catch (error) {
        throw new  ApiError(501,"Something went wrong while generating Refresh and Access Tokens");
    }
}

const loginUser = asyncHandler(async(req,res) => {
    //Bring data from req.body
    //check if both the fields are filled
    //email or username
    //find the user
    //check the password
    //generate access and refresh token 
    //send cookie

    const {username,email,password} = req.body;
    if(!username || !email) throw new ApiError(400,"Username or Password is required!");
    const existingUser = await User.findOne({
        $or:[{username},{email}]
    });
    if(!existingUser) throw new ApiError(400,"User does not exist");
    const isPasswordValid = await existingUser.isPasswordCorrect(password);
    if(!isPasswordValid) throw new ApiError(401,"Invalid user credentials");
    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(existingUser._id);
    
    const loggedInUser = await User.findOne(existingUser._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).json(
        new ApiResponse(200,"User Logged In Successfully",{user:loggedInUser,refreshToken,accessToken})
    );
})

const logoutUser = asyncHandler(async(req,res) => {
    //remove the cookies
    User.findByIdAndUpdate(req.user._id,
        {
            $set:{refrehToken : undefined},
        },
        {
            new:true
        },
    )
    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200).clearCookie("accessToken",options).clearCookie("refreshToken",options).json(
        new ApiResponse(200,"User Logged Out Successfully!",{})
    )
})

const refreshAccessToken = asyncHandler(async(req,res)=>{
    const incomingRefreshToken = req.cookie.refrehToken || req.body.refrehToken;
    if(!incomingRefreshToken) throw new ApiError(401,"Unauthorized Request");

    const decodedRefreshToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET);
    if(!decodedRefreshToken) throw new ApiError(401,"Invalid Refresh Token");

    const user = await User.findById(decodedRefreshToken?._id);
    if(!user) throw new ApiError(401,"Refresh Token has expired");

    if(incomingRefreshToken !== user?.refrehToken) throw new ApiError(401,"Invalid user details");
    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id);

    const options = {
        httpOnly: true,
        secure: true
    };
    return res.status(200).cookie("refreshToken",refreshToken,options).cookie("refreshToken",refreshToken,options).json(
        new ApiResponse(201,"Access token generated and updated successfully!",{accessToken,refreshToken})
    )
})

const addShippingAddress = asyncHandler(async(req,res)=>{
    const userID = req.user?._id;
    if(!userID) throw new ApiError(401,"Unauthorized request");
    const { addressline, landmark, city, pincode, phoneNumber, telephone, district, state } = req.body;
    if(!addressline || !city || !pincode || !phoneNumber || !district || !state) throw new ApiError(401,"All the mandatory fields should be filled");
    const address = await Address.create({
        userId:userID,
        addressline,
        landmark,
        district,
        pincode,
        state,
        phoneNumber,
        telephone,
        city
    })
    if(!address) throw new ApiError(501,"Something went wrong!");
    return res.status(201).json(
        new ApiResponse(200,"Address updated successfully!",{address})
    )
})

const getUserProfile = asyncHandler(async(req,res)=>{
    const {userId} = req.body?._id;
    if(!userId) throw new ApiError(401,"Unauthorized user");
    const user = await User.findById(userId);
    if(!user) throw new ApiError(401,"Couldn't find user profile");
    return res.status(200).json(
        new ApiResponse(201,"User sen successfully!",user)
    )
})

const  changePassword = asyncHandler(async(req,res)=>{
    const {existingPassword,newPassword,confirmPassword} = req.body;
    const userId = req.user?._id;
    if(!userId) throw new ApiError(401,"Unauthorized User");
    const user = await User.findById(userId);
    if(!user) throw new ApiError(404,"Something went wrong");
    if(newPassword!==confirmPassword) throw new ApiError(401,"Password does not match");
    const isPasswordCorrect = user.isPasswordCorrect(existingPassword);
    if(!isPasswordCorrect) throw new ApiError(401,"Incorrect exisiting password");
    user.password = newPassword;
    user = await user.save();
    user.select("-password -refreshToken");
    if(!user) throw new ApiError(401,"Couldn;t change password, Something went wrong!");
    return res.status(200).json(
        new ApiResponse(201,"Password updated successfully",user)
    )
})

export {registerUser, loginUser, logoutUser, refreshAccessToken, addShippingAddress, getUserProfile, changePassword}