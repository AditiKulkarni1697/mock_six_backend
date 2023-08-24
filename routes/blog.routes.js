const {BlogModel}=require("../models/blogs.model")

const express = require("express");
const { UserModel } = require("../models/user.model");

const blogRouter = express.Router()

blogRouter.post("/",async(req,res)=>{
    const { username,
        title,
        content,
        category,
        likes,
        comments}=req.body;
        

 try{
     const blog = new BlogModel({username,
        title,
        content,
        category,
        date : new Date(),
        likes:0,
        comments:[]})

        await blog.save()
        res.send("Blog created")
 }
 catch(err){
   res.send(err.message)
 }
}
)

blogRouter.get("/",async(req,res)=>{

   const query = req.query || ""

   

    try{
        if(query.sort&&query.order=="asc"){
            const blogs = await BlogModel.aggregate([{$sort:{date:1}}])
        res.send(blogs)
        }
       else if(query.sort&&query.order=="desc"){
            const blogs = await BlogModel.aggregate([{$sort:{date:-1}}])
        res.send(blogs)
        }
        else{
        const blogs = await BlogModel.find(query)
        res.send(blogs)
        }
    }
    catch(err){
        res.send(err.message)
    }
})

blogRouter.patch("/:id",async(req,res)=>{
const id = req.params.id;
const userID = req.body.userID

const {title} = req.body
console.log(title)
try{

const blog = await BlogModel.findOne({_id:id})

const user = await UserModel.findOne({_id:userID})

if(blog.username==user.Username){

    try{
       
        await BlogModel.findByIdAndUpdate({ _id: id}, {title:title})
    res.send("Blog updated")
    }
    catch(err){
        console.log(payload)
        res.send(err.message, "blog")
    }
}
else{
  res.send(err.message)
}
}
catch(err){
    res.send(err.message)
}
})

blogRouter.delete("/:id",async(req,res)=>{
    const id = req.params.id;
const userID = req.body.userID

const blog = await BlogModel.findOne({_id:id})

const user = await UserModel.findOne({_id:userID})

if(blog.username==user.Username){
    try{
       await BlogModel.findByIdAndDelete({_id:id})
       res.send("Blog deleted")
    }
    catch(err){
      res.send(err.message)
    }
}

else{
   res.send("please login")
}
}
)

module.exports = {blogRouter}