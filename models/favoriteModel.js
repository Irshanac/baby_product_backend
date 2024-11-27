import mongoose from "mongoose";
const favouriteSchema=mongoose.Schema({
    user:{type:mongoose.Schema.type.ObjectId,ref:"user",required:true}, 
    favourite:{type:mongoose.Schema.type.ObjectId,ref:"product",required:true}
})
const favourite=mongoose.model("favorite",favouriteSchema)
export default favourite