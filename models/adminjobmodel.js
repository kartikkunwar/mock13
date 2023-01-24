const mongoose=require("mongoose");
mongoose.set(`strictQuery`,true);

const jobSchema=mongoose.Schema({
    company:String,
    position:String,
    contract:String,
    location:String
})

const JobModel=mongoose.model('mcktstadmin',jobSchema)

module.exports={JobModel};