import express  from 'express'
import mongoose  from  'mongoose'
import UserProfile from './model.js'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import cors from  'cors'
app.use(cors({credentials:true,origin:'http://localhost:5173'}));
app.use(express.json())
import { nanoid } from 'nanoid'
nanoid(); 
import  {v2 as cloudinary}  from 'cloudinary'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import uploadImage from './UploadImage.js'
app.use(cookieParser())
app.use(bodyParser.json({limit : '10mb'}))
app.use(bodyParser.urlencoded({extended : true,limit : '10mb'}))

cloudinary.config({
    cloud_name :"dvlz73wcr",
    api_key : 414997947386377,
    api_secret : "pcZZGkrChX5shu5MoWOpNqEztp4"
})


app.post('/createprofile',async(req,res)=>{
        const {dp,username} = req.body
        const imageId = nanoid().split('-')[0]
        console.log(dp);
        try {
          const imageUrl = await uploadImage(dp,imageId)
  
          const profile = new UserProfile({imageUrl,username})
  
          const result = await profile.save()
          console.log(result);
          res.json(result)
        } catch (error) {
          
        }
})



// app.get('/:username',async(req,res)=>{
//     const {username} = req.params
//     try {
//         const response = await UserProfile.find({username : username})
//         res.status(200).json(response)
//     } catch (error) {
//         res.status(500).json("Not working")        
//     }
// })

const start = async()=>{
    mongoose.connect(process.env.MONGO_DB_URI)
    console.log("Connected to DB");
    app.listen(4000,()=>{
      console.log("Server running at port 4000");  
    })
  }
  
  start()
  