import {v2 as cloudinary} from "cloudinary"
import fs from "fs"




cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
})

console.log("Cloudinary Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("Cloudinary API Key:", process.env.CLOUDINARY_API_KEY);
console.log("Cloudinary API Secret:", process.env.CLOUDINARY_API_SECRET);
//console.log("Local file path:", localFilePath);

const uploadOnCloudinary = async (localFilePath) => {
console.log("localFilePath",localFilePath);

    try {
        if(!localFilePath) return null

         console.log("entered the function");

         console.log("localPath",localFilePath);
         
         const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })




        console.log("outside the function");
        console.log("response",response);
        

        
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null;
    }
}

export {uploadOnCloudinary}