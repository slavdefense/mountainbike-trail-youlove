import { v2 as cloudinary } from "cloudinary";
import  { CloudinaryStorage } from 'multer-storage-cloudinary';

//assign secret keys to the cloudinary server
cloudinary.config({
  cloud_name: process.env.SECRET_NAME,
  api_key: process.env.SECRET_KEY,
  api_secret:process.env.SECRET_SECRET
})

//create a folder on cloudinary and specify the types of files required for image upload
const storage = new CloudinaryStorage({
  cloudinary,
  params:{
    folder: 'BicycleTrails',
    allowedFormats:['jpeg','png','jpg']
  }
  
})

export{
  cloudinary,
  storage
}