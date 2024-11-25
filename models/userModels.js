import mongoose from "mongoose";
const userModel=new mongoose.Schema({
    username:{type:String,require:true},
    password:{type:String,require:true},
    name:{type:String,require:true},
    email:{type:String,require:true}
})
const user=mongoose.model('user',userModel)
export default user