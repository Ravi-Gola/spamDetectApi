const express=require("express");
const User = require("../models/User");
const { route } = require("./auth");
const router=express.Router();

router.get('/',async(req,res)=>{
    try {
        const users = await User.find({}).select("-password");
        res.send(users); 
    } catch (error) {
        res.status(500).json({success:false,msg:"something went wrong..."})
    }
})

router.get('/search/:query', async (req, res) => {
    const searchQuery = req.params.query;
    const phoneNumber = /^\d+$/.test(searchQuery) ? parseInt(searchQuery, 10) : null;

    // Construct the query to search for the searchQuery in multiple fields
    const query = {
      $or: [
        { username: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search for name
        { email: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search for email
        { phone: phoneNumber }, // Case-insensitive search for phone
      ],
    };
  
    try {
      const users = await User.find(query)
      res.send(users);
    } catch (err) {
      console.error('Error fetching users:', err);
      res.status(500).send('Error fetching users');
    }
  });

  router.get('/spammers',async(req,res)=>{
        try {
            const spammers= await User.find({spam:true})
            res.send(spammers)
        } catch (error) {
            res.status(500).json({success:false,msg:"something went wrong..."})
        }
  })
  router.get('/spamCheck/:query', async (req, res) => {
    const searchQuery = req.params.query;
    const phoneNumber = /^\d+$/.test(searchQuery) ? parseInt(searchQuery, 10) : null;

    // Construct the query to search for the searchQuery in multiple fields
    const query = {
      $or: [
        { username: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search for name
        { email: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search for email
        { phone: phoneNumber }, // Case-insensitive search for phone
      ],
    };
  
    try {
      const users = await User.find(query).select("-password")
      var spams = [];
      users.forEach((user)=>{
          if(user.spam===true)spams.push(user);
      })
      res.send(spams);
    } catch (err) {
        console.log(err)
      res.status(500).send('Error fetching users');
    }
  });

  router.put('/makeSpam/:id',async(req,res)=>{
    try {
        console.log(req.params.id)
        const user = await User.findByIdAndUpdate(req.params.id,{
            spam:true,
        });
        res.status(200).json("Account has been updated")
        
    } catch (error) {
       return res.status(500).json(err); 
    }   
  })
  

module.exports=router