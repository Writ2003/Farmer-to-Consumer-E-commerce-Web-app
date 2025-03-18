import mongoose, { Schema } from 'mongoose'
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    fullname : {
        type: String,
        required: true
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password : {
        type : String,
        required : [true, "Password is required"],
        match:/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
        minlength : 8,
        maxlength : 20
    },
    coverImage: {
        type : String,
        required:true
    },
    refrehToken : {
        type : String
    },
    userType:{
        type:String,
        enum:["Customer","Farmer"],
        required: true,
        default:'Select'
    }
}, { timestamps: true }) 

userSchema.pre("save", async function (next) {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password,10);
        next();
    }
    else next();
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateRefreshTokens = function() {
    return jwt.sign(
        {
            _id : this._id,    
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateAccessTokens = function() {
    return jwt.sign(
        {
            _id : this._id,   
            email : this.email,
            fullname : this.fullname,
            username : this.username 
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User", userSchema);