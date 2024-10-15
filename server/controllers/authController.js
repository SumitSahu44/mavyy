const User = require('../models/userModel');

function userControllers(){
    return {
       async postSignup(req,res){
            const {name,email,password} = req.body;
               
                 if(!name || !email  || !password)
                 {
                    return res.json({"error":"All fields are required"});
                 }
               try {
                    const userCreated = await User.create({name,email,password})
                    return res.json({message: "User Created"})
                 } catch (error) {
                    return  res.status(500).json({error})
                 }
             
            },

            async postSignin(req,res)
            {
                const {email,password} = req.body;
                if(!email  || !password)
                    {
                        return res.json({"error":"All fields are required"});
                    }
                    try {
                       const userFound = await User.findOne({email,password})
                       if(userFound)
                       {
                        return  res.send("user found")
                       }else{
                        return  res.send("user not found")
                       }
                    } catch (error) {
                       
                    }
            }
        }
        
    }



module.exports = userControllers