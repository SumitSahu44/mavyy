const User = require('../models/userModel');

function userControllers(){
    return {
       async postSignup(req,res){
            const {name,email,password} = req.body;
               
                 if(!name || !email  || !password)
                 {
                     res.json({"error":"All fields are required"});
                 }
               try {
                    const userCreated = await User.create({name,email,password})
                    res.json({usercrated : userCreated._id})
                 } catch (error) {
                    res.json({message: "user not crated", error : error.errorResponse.errmsg})
                 }
             
            },

            async postSignin(req,res)
            {
                const {email,password} = req.body;
                if(!email  || !password)
                    {
                        res.json({"error":"All fields are required"});
                    }
                    try {
                       const userFound = await User.findOne({email,password})
                       if(userFound)
                       {
                              res.send("user found")
                       }else{
                               res.send("user not found")
                       }
                    } catch (error) {
                       
                    }
            }
        }
        
    }



module.exports = userControllers