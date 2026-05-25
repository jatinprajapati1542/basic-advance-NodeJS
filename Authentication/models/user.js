import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
    },
    userpassword:{
        type:String,
        required:true,
    }
})

export default mongoose.model('users',userSchema)