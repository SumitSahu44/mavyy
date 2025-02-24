
const nodemailer = require("nodemailer");
function sendMailController()
{
    return {
        async sendMail(req,res){

                const {email} = req.body;

            // Create a transporter object
const transporter = nodemailer.createTransport({
    service: "gmail", // Use your email service provider (Gmail, Outlook, etc.)
    auth: {
      user: "sumitkumarsahu141@gmail.com", // Replace with your email
      pass: "Programmer.2021", // Replace with your email password or App Password
    },
  });
  
  // Define mail options
  const mailOptions = {
    from: "sumitkumarsahu141@gmail.com",
    to: email, // Receiver's email
    subject: "Test Email from Node.js",
    text: "Hello, this is a test email sent from a Node.js application!",
  };
  
  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });



        }
    }
}


module.exports = sendMailController;