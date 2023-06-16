const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const Post = require('./Postmodel')
const bcrypt = require('bcryptjs')
const User = require('./UserModel')
require('dotenv').config()



app.use(cors({credentials:true,origin:'http://localhost:5173'}));
app.use(express.json());
mongoose.connect(process.env.MONGO_DB_URI);


app.post('/register',async (req,res)=>{
    const {username,password,name} = req.body

    // Check if user already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }
    
    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      name,
      username,
        password: hashedPassword
      });
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" , username });
    })
    

// Login a user
app.post('/login',async(req,res)=>{
    const {username,password} = req.body

      // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

       // Compare passwords
       const isMatch =  bcrypt.compareSync(password, user.password);
       if (!isMatch) {
         return res.status(401).json({ error: "Invalid credentials" });
       }

 

      const userid = user.username  
  
      res.json({ message: "Login successful", userid });
})


// logout a user
app.post('/logout',async(req,res)=>{
    res.json({ message: "Logout successful" });
})



app.post('/post',async(req,res)=>{
    const {heading,content} = req.body
    const post = await Post.create({
        heading,
        content
    })
    res.json(post)
})

app.get('/post',async(req,res)=>{
    res.json(
        await Post.find()
        .sort({createdAt:-1})   //* Sorting from the time of creation(descending order)
    )
})


//* I will use this in future
app.post('/post/:id',async(req,res)=>{
    const {id} = req.params
    const postDetail = await Post.findById(id)
    res.json(postDetail)
})

app.listen(4000,()=>console.log("Server running at port 4000"));




