const express=require("express");

const {JobModel}=require("../models/adminjobmodel")

const jobRoute=express.Router();

jobRoute.get("/",async(req,res)=>{
    try{
       const x=await JobModel.find()
       res.send(x);
    }
    catch(err){
        console.log(err);
        res.send(err)
    }
})


jobRoute.post("/newjob",async(req,res)=>{
    const {company,position,contract,location}=req.body
    try{
        const newj=new JobModel({company,position,contract,location})
        await newj.save()
        res.send({"msg":"job posted successfully"})
    }
    catch(err){
        console.log(err);
        res.send({"msg":"error posting"})
    }
    
})



jobRoute.delete("/delete/:jobID",async(req,res)=>{
    const id=req.params.jobID
    try{
        await JobModel.findByIdAndDelete({_id:id})
        res.send({"msg":"job deleted"})
    }
    catch(err){
        console.log(err);
        res.send({"msg":"invalid request"})
    }
})

module.exports={jobRoute}