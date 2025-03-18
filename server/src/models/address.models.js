import mongoose from "mongoose";

const addressSchema = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    addressline : {
        type : String,
        required : true
    },
    landmark : {
        type : String,
    },
    city : {
        type : String,
        required : true
    },
    pincode : {
        type : Number,
        required : true
    },
    phoneNumber : {
        type : Number,
        required : true
    },
    telephone : {
        type : Number,
        required : false
    },
    district : {
        type : String,
        required : true
    },
    state : {
        type : String,
        enum: ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal'],
        default : 'Select'
    }
});

export const Address = mongoose.model("Address", addressSchema);