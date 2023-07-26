const express= require("express");
const router= express.Router();
const Admin= require("../models/admin.model")

// register route

router.post("/register",async(req,res)=>{
     try {
        const admin= await Admin.create(req.body);
        return res.status(201).send(admin)
     } catch (error) {
        return res.status(400).send({message:error.message})
     }
})
// login route
router.post("/login",async(req,res)=>{
    try {
      const admin= await Admin.findOne({email:req.body.email , password:req.body.password}).lean().exec();
    //    console.log("user record" , admin)
       return admin?res.status(200).send({message:"Logged in !!" ,email:admin.email,_id:admin._id}):res.status(400).send({message:"Please try another email or password" })
    } catch (error) {
       return res.status(400).send({message:error.message})
    }
})

router.get("",async(req,res)=>{
    try {
        const alluser= await Admin.find().lean().exec();
        return res.status(200).send(alluser)
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})
module.exports= router;