require("dotenv").config();
const User = require("../models/user");
const Jwt = require('jsonwebtoken');

exports.signup = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password)
        return res.status(400).json({error:'plz include all the fields',status:'failed'})
        // res.send(req.body)
        const userExist = await User.findOne({email:req.body.email});
        if(userExist)
        return res.status(400).json({error:'user Already exist'})
    let  result = new User({name,email,password});

    await result.save();
    result.password = undefined;
    let token = Jwt.sign({user:result.email,id:result._id},process.env.JWT_SECRET,{expiresIn:'3h'});


    return res.status(201).json({user:result,auth:token,error:'',message:'Registration successfull',status:'success'})


        
    } catch (err) {
        return res.status(500).json({err:err.message,message:"Something went wrong",status:"failed"})  
    }
}


exports.login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password)
        return res.status(400).json({error:'plz include all the fields',status:'failed'})
        // res.send(req.body)
        const userExist = await User.findOne({email:req.body.email});
        // console.log("hi",userExist)
        if(!userExist)
        return res.status(400).json({error:'user not found exist'})
    if(!(userExist.password === req.body.password))
    return res.status(400).json({error:'password do not match'})
    userExist.password = undefined;


    let token = Jwt.sign({user:userExist.email,id:userExist._id},process.env.JWT_SECRET,{expiresIn:'3h'});
    return res.status(200).json({user:userExist,auth:token,error:'',message:'Login successfull',status:'success'})


         
    } catch (err) {
        return res.status(500).json({err:err.message,message:"Something went wrong",status:"failed"})  
    }
}