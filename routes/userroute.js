const express=require("express");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

const {SignupModel}=require("../models/usersignupmodel")

const userRouter=express.Router();

userRouter.get("/",async(req,res)=>{
    try{
       const x=await SignupModel.find()
       res.send(x);
    }
    catch(err){
        console.log(err);
        res.send(err)
    }
})


userRouter.post("/signup",async(req,res)=>{
    const {name,email,password}=req.body;
    const getuser=await SignupModel.find({email})
    let bag=email.split("@")
    let person;
    if(bag[1]=="masaischool.com"){
        person="admin"
    }else{
        person="user"
    }
    if(getuser.length>0){
        res.send("user already registered")
    }else{
        try{            
            bcrypt.hash(password,12,async (error,hash)=>{
                const newuser=new SignupModel({name,email,person,password:hash})
                await newuser.save();
                res.send({"msg":"user registered successfully"})
            })
         }
         catch(err){
             console.log(err);
             res.send({"msg":"user registration failed"})
         }
    }
    
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
       const user=await SignupModel.find({email})
       if(user.length>0){
        const hashedpass=user[0].password
        bcrypt.compare(password,hashedpass,(err,result)=>{
            if(result){
                const token=jwt.sign({"userID":user[0]._id},"kartik")
                res.send({'msg':"login successful",'token':token,'user':user})
            }else{
                res.send({"msg":"login failed"})
            }
        })
       }else{
        res.send({"msg":"wrong credentials"})
       }
    }
    catch(err){
        console.log(err);
        res.send(err)
    }
})

userRouter.delete("/delete/:userID",async(req,res)=>{
    const id=req.params.userID
    try{
        await SignupModel.findByIdAndDelete({_id:id})
        res.send({"msg":"user deleted"})
    }
    catch(err){
        console.log(err);
        res.send({"msg":"invalid request"})
    }
})

module.exports={userRouter}