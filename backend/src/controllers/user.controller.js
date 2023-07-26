const express= require("express");
const fs= require('fs')
const router=express.Router();
const  User= require("../models/user.model");
const {uploadSingle} = require('../middlewares/uploadfile');
const path = require("path");


// *? all users get route
router.get("",async(req,res)=>{
      try {
        const searchValue=req.query.search
        if(searchValue){

          const users= await User.find().sort({createdAt:-1}).lean().exec();
          const filteredUsers= users.filter((user)=>{
             if(user.firstName===searchValue){
              return user
             }
             else if(user.lastName===searchValue){
              return user
             }
             else if(user.email===searchValue){
              return user
             }
             else if(user.phone===searchValue){
              return user
             }
             else if(user.gender===searchValue){
              return user
             }
          })
          return res.status(200).send(filteredUsers)
        }

        // **if there is no search query then returned whole available data
        const users= await User.find().lean().exec();
        return res.status(200).send(users)
 
      } catch (error) {
        return res.status(401).send({message:error.message})
      }
})

// *? create single user route
router.post("",uploadSingle('profile_pic'),async(req,res)=>{
        // console.log("files from req body" , req.body);
        // console.log('req file ',req.file)
        const existingUser= await User.find({email:req.body.email}).lean().exec();
         if(existingUser[0]?.email){
          return res.status(400).send({message:'User already exists'})
         }
    try {
      const user= await User.create({
         firstName:req.body.firstName,
         lastName:req.body.lastName,
         email:req.body.email,
         phone:req.body.phone,
         gender:req.body.gender,
         profile_pic:req.file?.filename 
      })
      return res.status(201).send(user)

    } catch (error) {
      console.log(error)
      return res.status(401).send({message:error.message})
    }
})

// *? update single user information with profile pictue
router.patch("/profile",uploadSingle('profile_pic'),async(req,res)=>{
    try {
      const currentUser= await User.findById(req.body._id).lean().exec();
            const {firstName,lastName,email,phone,gender}=req.body;
      const user= await User.findByIdAndUpdate(req.body._id,{firstName,lastName,email,phone,gender,profile_pic:req.file.filename} ,{new:true})
      const deletePath='../uploads/'+currentUser.profile_pic
      fs.unlinkSync(path.join(__dirname,deletePath));
      return res.status(200).send(user)

    } catch (error) {
      return res.status(401).send({message:error.message})
    }
})

// *? update single user information without profile pictue
router.patch("",async(req,res)=>{
  try {
    const user= await User.findByIdAndUpdate(req.body._id,req.body ,{new:true})

    return res.status(200).send(user)

  } catch (error) {
    return res.status(401).send({message:error.message})
  }
})

// *? delete single user by id
router.delete("/:id",async(req,res)=>{
    try {
           // removing uploaded image from the upload folder 
            
           const currentUser= await User.findById(req.params.id).lean().exec();
           const deletePath='../uploads/'+currentUser.profile_pic
            fs.unlinkSync(path.join(__dirname,deletePath));
          
      const user= await User.findByIdAndDelete(req.params.id)
      return res.status(200).send({message:"user deleted successfully"})

    } catch (error) {
      return res.status(401).send({message:error.message})
    }
})


module.exports=router