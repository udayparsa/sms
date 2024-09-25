const mongoose=require('mongoose')
const registerSchema=new mongoose.Schema({
    Student_id:Number,
    Student_name:String,
    Student_dept:String,
    phonenumber:Number,
    email:String,    
})
module.exports=mongoose.model("register",registerSchema)
