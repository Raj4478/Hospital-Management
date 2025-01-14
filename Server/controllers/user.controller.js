import { asyncHandler } from "../utils/asyncHandler.js"
import { Patient, User,FoodChart, PantryStaff } from "../model/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const generateAccessAndRefreshToken = async(userId) => {
    try {
        const user = await User.findById(userId)
        
        
        const accessToken = user.generateAccessToken()

        console.log("accessToken is",accessToken);
        const refreshToken = user.generateRefreshToken()
        
        console.log("refreshToken is",refreshToken);

        

        user.refreshToken = refreshToken

        await user.save({validateBeforeSave : false})

        return {accessToken,refreshToken}


    } catch (error) {
        
        throw new ApiError(500,"Something went wrong while generating refresh and access token")
    }
}

const registerUser = asyncHandler( async (req, res) => {
    


    const {fullName, email, username, password,AccountType} = req.body

    console.log("fullname is ",fullName);
    
 
    
    
    

    if (
        [fullName, email, username, password,AccountType].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    console.log("req body is ",req.files);

   
   let coverImageLocalPath;

   

   
    coverImageLocalPath = req.files.coverImage[0].path
    console.log("coverImageLocalPath",coverImageLocalPath);
    
   
 
   const coverImage = await uploadOnCloudinary(coverImageLocalPath)
   
   console.log("coverImage",coverImage);

    const user = await User.create({
        fullName,
        email, 
        password,
        username: username.toLowerCase(),
        coverImage: coverImage?.url || "",
        AccountType,
    })

    const createdUser = await User.findById(user._id).select(
         "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

} )



const login = asyncHandler(async(req,res) => {

const {email,password,AccountType} = req.body

if(!email){

    throw new ApiError(400,"Email is required")
}

const user = await User.findOne({
    $or : [{email}]
})
console.log(user);


if(!user){
    throw new ApiError(404,"User does not exist")
}
const isPasswordValid = await user.isPasswordCorrect(password)

if(!isPasswordValid){
    throw new ApiError(401,"Invalid User Credentials")
}

const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id)

const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

const options = {
    httpOnly : true,
    secure : true
}

return res
.status(200)
.cookie("accessToken",accessToken,options)
.cookie("refreshToken",refreshToken,options)
.json(
    new ApiResponse(200,{user:loggedInUser,accessToken,refreshToken},"User successfully logged in")
)
})
const PatientDetail = asyncHandler(async(req,res) => {

    const {patientName,
        disease,
        allergies,
        bloodGroup,
        roomNumber,
        bedNumber,
        floorNumber,
        age,
        gender,
        contactInformation,
        emergencyContact} = req.body

        console.log("patient data is",req.body);
        

        if(!patientName || !disease || !roomNumber || !bedNumber){
            throw new ApiError(400,"Please fill the data")
        }

        let coverImageLocalPath;

   

   
    coverImageLocalPath = req.files.patientimage[0].path
    console.log("coverImageLocalPath",coverImageLocalPath);
    
   
 
   const coverImage = await uploadOnCloudinary(coverImageLocalPath)
   
   console.log("coverImage",coverImage);

        const patient = await Patient.create({
            patientName,
        disease,
        allergies,
        bloodGroup,
        roomNumber,
        bedNumber,
        floorNumber,
        age,
        gender,
        contactInformation,
        emergencyContact,
        bloodGroup,
        coverImage : coverImage.url || " "
        })

        console.log("createdpatient is",patient);
        

        const createdPatient = await Patient.findById(patient._id)

        if (!createdPatient) {
            throw new ApiError(500, "Something went wrong while registering the user")
        }
    
        return res.status(201).json(
            new ApiResponse(200, createdPatient, "User registered Successfully"))



})

const retrievePatient = asyncHandler(async (req, res) => {
    
    const allData = await Patient.find({});
  
    console.log("Data retrieved successfully:", allData);
  
    
    if (!allData || allData.length === 0) {
      throw new ApiError(404, "Patient data not fetched successfully");
    }
  

    return res.status(200).json(
      new ApiResponse(200, allData, "Data retrieved successfully")
    );
  });
  


const foodChartMenu = asyncHandler(async(req,res)=>{

    const{morning,evening,nightMeal,morningIngriends,eveningIngrediends,nightIngriends,specialInstructions} = req.body


    console.log("req.body is",req.body);

    console.log("req.files is",req.files);
    
    if(!morning || !evening || !nightMeal){
        throw new ApiError(400,"Please fill the data")
    }

    let coverImageLocalPath1;

   

   
    coverImageLocalPath1 = req.files.coverImage1[0].path
    console.log("coverImageLocalPath1",coverImageLocalPath1);

    let coverImageLocalPath2;

   

   
    coverImageLocalPath2 = req.files.coverImage2[0].path
    console.log("coverImageLocalPath2",coverImageLocalPath2);
    
   
 
   const coverImage1 = await uploadOnCloudinary(coverImageLocalPath1)
   
   console.log("coverImage1",coverImage1);
    
   
 
   const coverImage2 = await uploadOnCloudinary(coverImageLocalPath2)
   
   console.log("coverImage2",coverImage2);


   let coverImageLocalPath3;

   

   
    coverImageLocalPath3 = req.files.coverImage3[0].path
    console.log("coverImageLocalPath3",coverImageLocalPath3);
    
   
 
   const coverImage3 = await uploadOnCloudinary(coverImageLocalPath3)
   
   console.log("coverImage3",coverImage3);

    const foodChart = await FoodChart.create({
        morning,
        evening,
        nightMeal,
        morningIngriends,
        eveningIngrediends,
        nightIngriends,
        specialInstructions,
        coverImage1 : coverImage1.url || " ",
        coverImage2 : coverImage2.url || " ",
        coverImage3 : coverImage3.url || " "
    })

    const createdFoodChart = await FoodChart.findById(foodChart._id)

    if (!createdFoodChart) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdFoodChart, "User registered Successfully"))

})

const pantrypersonal = asyncHandler(async(req,res)=>{

    const{name,contactInfo,deliveryStatus} = req.body

    if(!name || !contactInfo || !deliveryStatus){
        throw new ApiError(400,"Please fill the data")
    }

    let coverImageLocalPath;

    console.log(req.files);
    
  
    coverImageLocalPath = req.files.pantrypersonal[0].path
        console.log("coverImageLocalPath",coverImageLocalPath);
    
    


   
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
   
   console.log("coverImage",coverImage);

    const pantryPersonal = await PantryStaff.create({
        name,
        contactInfo,
        deliveryStatus,
        coverImage : coverImage.url || " "
    })

    const createdPantryPersonal = await PantryStaff.findById(pantryPersonal._id)

    if (!createdPantryPersonal) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdPantryPersonal, "User registered Successfully"))

})

const particularPatientDetail = asyncHandler(async(req,res)=> {


    const {object_id} = req.body
    const patientdetail = await Patient.findById(object_id)
    

    if(!patientdetail){
        throw new ApiError(404,"Patient detail not fetched")
        
    }

    return res.status(200).json(
        new ApiResponse(200, patientdetail, "Data retrieved successfully")
      );

})

const fetchFoodMenu = asyncHandler(async(req,res)=> {

    const menu = await FoodChart.find({})

    if(!menu){
        throw new ApiError(404,"failed to fetch menu Chart")
    }

    return res.status(200).json(
        new ApiResponse(200,menu,"Menu retrieved successfully")
    )

})


export {

    registerUser,
    generateAccessAndRefreshToken,
    login,
    PatientDetail,
    foodChartMenu,
    pantrypersonal,
    retrievePatient,
    particularPatientDetail,
    fetchFoodMenu
    
}