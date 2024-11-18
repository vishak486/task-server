const users=require('../models/userModel')
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')

exports.registerController=async(req,res)=>{
    console.log("Inside registerController");
    const {username,email,password}=req.body
    try
    {
        const existingUser= await users.findOne({email})
        if(existingUser)
        {
            res.status(406).json("ALready Existing User....Please login")
        }
        else
        {
            const hashedPassword = await bcrypt.hash(password,10);
            const newUser= new users({
                username,email,password:hashedPassword
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch(err){
        res.status(401).json(err)
    }
    
}

exports.loginController=async(req,res)=>{
    console.log("Inside loginController");
    const {email,password}=req.body
    try
    {
        const existingUser=await users.findOne({email})
        if(existingUser)
        {
            const token = jwt.sign({userId:existingUser._id},process.env.JWTPASSWORD)
            console.log(token);
            const isMatch = await bcrypt.compareSync(password, existingUser.password)
            if(isMatch)
            {
                res.status(200).json({
                    user:existingUser,token
                })
            }
            else
            {
                res.status(404).json("Invalid Password")
            }
            
        }
        else
        {
            res.status(404).json("Incorrect Email / Password")
        }
    }
    catch(err)
    {
        console.log(err);
        
    }
}