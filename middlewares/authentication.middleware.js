const express = require("express")

const jwt = require("jsonwebtoken")

const auth = (req,res,next)=>{
    const token = req.headers.authorization 
    var decoded = jwt.verify(token, 'token');
    console.log(token)
    if(token){
        if(req.method=="POST"){
            console.log(decoded)
            req.body.username = decoded.username
            console.log(req.body)
            next()
        }
        else if(req.method=="PATCH"||req.method=="DELETE"){
              req.body.userID = decoded.userID
              next()
        }
        else{
            next()
        }
    
    }
    else{
        res.send("please login")
    }
}

module.exports = {auth}