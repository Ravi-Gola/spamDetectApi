const express=require("express");
const router=express.Router();
const bcrypt=require("bcrypt");
const User=require('../models/User');

router.post('/register',async(req,res)=>{
    
    try {
        const Salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(req.body.password,Salt)
            const user= await new User({
                username:req.body.username,
                phone:req.body.phone,
                email:req.body.email,
                password:hashPassword
            })
        
        await user.save()
        res.send({success:true,msg:"Registered successfully"});
    } catch (error) {
        console.log(error)
        res.send({success:false,msg:"Not Registered! Try again"});
    }
   
})

router.post('/login', async(req,res)=>{
    try {
        const user = await User.findOne({phone:req.body.phone});
    !user && res.status(404).json("user not found");

    const valid = await bcrypt.compare(req.body.password,user.password);
    !valid && res.status(400).json("wrong password");
    res.status(200).json({success:true,user:user});
    } catch (error) {
        console.log(error)
    }
})

module.exports=router