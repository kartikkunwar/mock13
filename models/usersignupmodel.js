const mongoose=require("mongoose");
mongoose.set(`strictQuery`,true);

const signupSchema=mongoose.Schema({
    name:String,
    email:String,
    person:String,
    password:String
})

const SignupModel=mongoose.model('mcktstthree',signupSchema)

module.exports={SignupModel};