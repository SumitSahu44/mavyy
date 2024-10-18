// Assuming you have a User model to interact with your database
const User = require('../models/userModel');

function authenticateToken()
{
   return {
         async userId(req,res)
          {
            try {
              // req.user should have the userId because it was added in the middleware
              const userId = req.user.userId;
             
              // Optionally, fetch the full user details from the database using the userId
              const user = await User.findById(userId);
         
              if (!user) {
                return res.status(404).json({ message: 'User not found' });
              }
          
              // Send the userId (or any other necessary user details)
              res.json({
                userId: user._id,
    
              });
            } catch (error) {
              console.error('Error fetching user details:', error);
              res.status(500).json({ message: 'Server error' });
            }
          }
   }
  
 
}
module.exports = authenticateToken;
