const {UserModel}=require("../models/user.model")

const express = require("express")

const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")

const userRouter = express.Router()

userRouter.get("/",async(req,res)=>{
try{
   const users = await UserModel.find()
   res.send(users)
}
catch(err){
  res.send(err.message)
}
})

userRouter.post("/register",async(req,res)=>{
    const {Username, Avatar, Email,Password} = req.body;

try{
    
    bcrypt.hash(Password,8,async(err,hash)=>{
        const user = new UserModel({Username, Avatar, Email,Password:hash})
        console.log(user,"user")
        await user.save()
    res.send("User registered")
    })
    
}
catch(err){
  res.send(err.message)
}
})

userRouter.post("/login",async(req,res)=>{
    const {Email,Password} = req.body
     try{
    const user = await UserModel.findOne({Email})
    console.log(user)
    bcrypt.compare(Password,user.Password, (err,result)=>{
        if(result){
           const token  = jwt.sign({userID:user._id,username:user.Username},"token")
           res.send({msg:"user logged in", token:token})
        }
        else{
          res.send("error 1")
        }
    })
}
catch(err){
  res.send("error 2")
}
    
})

module.exports = {userRouter}