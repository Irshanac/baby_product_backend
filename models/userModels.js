import mongoose from "mongoose";
const userModel=new mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true},
    isAdmin:{type:Boolean,required:true,default:false},
    isBlock:{type:Boolean,required:true,default:false}
})
const   user=mongoose.model('user',userModel)
export default user