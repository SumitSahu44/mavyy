const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
function userControllers(){
    return {
       async postSignup(req,res){

        
            const {name,email,password} = req.body;
            JWT_SECRET = process.env.JSONWEBTOKEN;
                 if(!name || !email  || !password)
                 {
                    return res.json({"error":"All fields are required"});
                 }
               try {
                    const userCreated = await User.create({name,email,password})
                         // Create a JWT token using the user ID
                        const token = jwt.sign({ userId: userCreated._id }, JWT_SECRET, {
                            expiresIn: '30d' // Set token expiration time
                        });

                        // res.cookie('token', token, {
                        //        maxAge: 3600000 * 720 , // 1 hour in milliseconds
                        //        httpOnly: true
                        // });

                        //return token to the frontend
                   
                    return res.json({message: "User Created", userId: userCreated._id, token: token})
                 } catch (error) {
                    return  res.status(500).json({error})
                 }
             
            },

            async postSignin(req,res)
            {
                const {email,password} = req.body;
                JWT_SECRET = process.env.JSONWEBTOKEN;
                if(!email  || !password)
                    {
                        return res.json({"error":"All fields are required"});
                    }
                    try {
                       const userFound = await User.findOne({email,password})
                       if(userFound)
                       {

                         // Create a JWT token for the logged-in user
                            const token = jwt.sign({ userId: userFound._id }, JWT_SECRET, {
                                expiresIn: '30d' // Set token expiration time
                            });

                            // Set the token as a cookie
                            // res.cookie('token', token, {
                            //     httpOnly: true,
                            //     maxAge: 3600000 // 1 hour
                            // });
                            return res.json({message: "User Login", token : token})
                       }else{

                        return res.status(404).json({ message: "User not found" });

                       }
                    } catch (error) {
                        res.json({ message: "Login failed", error: error.message });
                    }
            },
            async checkAuth(req,res)
            {
                const token = req.headers.authorization?.split(" ")[1];

                if (!token) {
                    return res.json({ message: "Not logged in" });
                }
                try {
                    // Verify the JWT token
                    const decoded = jwt.verify(token, JWT_SECRET);
    
                    // If verified, return the user ID
                    res.json({ message: "User is logged in", userId: decoded.userId });
                } catch (error) {
                    res.json({ message: "Invalid token", error: error.message });
                }
            }
        }
        
    }



module.exports = userControllers
