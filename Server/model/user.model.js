import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = mongoose.Schema(
    {
        username : {
            type: String,
            required : true,
            unique: true,
            lowercase : true,
            trim : true,
            index:true
            
        },
        email:{
            type: String,
            required : true,
            unique: true,
            trim : true
        },
        password:{
            type: String,
            required : true,

        },
        coverImage :{
         type : String
        },
        fullName: {
            type:String,
            required:true,
            trim : true,
            index:true
        },
        AccountType: {
            type: String,
            required:true,
            trim : true,
        index:true
            
        },
        
       
        
        refreshToken : {
            type : String,
        }
        },
        { timestamps : true }
    
);



const patientSchema = mongoose.Schema({

    patientName : {
        type : String,
        required : true,
        lowercase : true,
        trim: true,
        index : true
    },
    disease : {
        type:String,
        required : true,
        trim : true
    },
    allergies : {
        type :String,
        lowercase : true,
        trim : true
    },
    coverImage :{
        type : String
       },
    bloodGroup : {
         
        type :String,
        lowercase : true,
        trim : true,
        required : true
    },
    roomNumber : {
        type  :String,
        lowercase : true,
        required: true,
        trim : true
    },
    bedNumber : {
        type  :String,
        lowercase : true,
        required : true,
        trim : true
    },
    floorNumber : {
        type  :String,
        lowercase : true,
        trim : true

    },
    age : {
        type  :String,
        lowercase : true,
        trim : true

    },    
    gender  : {
        type : String,
        lowercase : true,
        trim : true
    },
    contactInformation : {
        type : String,
        lowercase : true,
        trim : true
    },
    emergencyContact : {

        type : String,
        lowercase : true,
        trim : true
    },
    object_id : {
        type : String
    }


},{timestamps:true})


const foodChartSchema = ({

    morning : {
        type : String,
        required : true,
        lowercase : true,
        trim : true
    },
    evening : {
        type : String,
        required : true,
        lowercase : true,
        trim : true
    },
    coverImage :{
        type : String
       },
    nightMeal : {
        type : String,
        required : true,
        lowercase : true,
        trim : true
    },
})

const pantryStaffSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        lowercase : true,
        trim : true
    },
    contactInfo : {
        type : String,
        required : true,
        lowercase : true,
        trim : true
    },
    coverImage :{
        type : String
       },
    deliveryStatus : {
        type : String,
        
        lowercase : true,
        trim: true
    },
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    console.log("password is",password);
    console.log("bcrypt password is",this.password);

console.log(await bcrypt.compare(password,this.password));

    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function () {
    try {
      return jwt.sign(
        {
          _id: this._id,
          email: this.email,
          username: this.username,
          fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
      );
    } catch (error) {
      console.error("Error generating access token:", error);
      throw new Error("Access token generation failed");
    }
  };
  

  userSchema.methods.generateRefreshToken = function () {
    try {
        return jwt.sign(
            {
                _id: this._id,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
            }
        );
    } catch (error) {
        console.log("Error in generating refresh token:", error);
        return new Error("refresh token generation failed")
    }
};


export const User = mongoose.model("User", userSchema);
export const Patient = mongoose.model("Patient",patientSchema);
export const FoodChart = mongoose.model("FoodChart",foodChartSchema);
export const PantryStaff = mongoose.model("PantryStaff",pantryStaffSchema);