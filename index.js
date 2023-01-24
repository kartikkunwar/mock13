const cors=require("cors");
const express=require("express");

const {connection}=require("./config/db")
const {userRouter}=require("./routes/userroute")
const {jobRoute}=require("./routes/jobroute")

const app=express();

app.use(express.json());

app.use(cors({
    origin:"*"
}))
app.use("/user",userRouter)
app.use("/job",jobRoute)

app.listen(7300,async()=>{
    try{
      await connection;
      console.log("connected to dbs")
    }
    catch(err){
        console.log(err);
        console.log("error connecting")
    }
    console.log("connection establised successfully")
})