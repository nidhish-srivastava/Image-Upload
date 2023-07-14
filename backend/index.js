const express  = require('express')
const mongoose  =  require('mongoose')
const UserProfile = require('./model')
const app = express()
const dotenv  = require('dotenv')
dotenv.config()
const cors = require('cors')
app.use(cors({credentials:true,origin:'http://localhost:5173'}));
app.use(express.json())

app.post('/createprofile',async(req,res)=>{
    try {
        let {dp,username} = req.body
        await UserProfile.create({dp,username})
        res.status(201).json("Uploaded")
    } catch (error) {
        res.status(500).json("Not working")        
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
  