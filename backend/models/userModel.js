import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
       
    },
    image:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    is_Admin:{
        type:Boolean,
        required:true,
    }
})

const User = mongoose.model('user',userSchema)

export default User