const { default: mongoose } = require("mongoose");

// **  user schema 
/*
Fistname
Lastname
Email
Phone number
Gender
*/
const userSchema= new mongoose.Schema({
     firstName:{type:String,rquired:true},
     lastName:{type:String,rquired:true},
     email:{type:String,rquired:true , unique:true},
     phone:{type:String,rquired:true},
     gender:{type:String,rquired:true},
     profile_pic:{type:String,required:true}

},{
    versionKey:false,
    timestamps:true
})

module.exports= mongoose.model("user",userSchema)