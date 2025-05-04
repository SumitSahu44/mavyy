require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 5000
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
// Middleware to parse JSON data
app.use(express.json());

app.set("trust proxy", 1); // Trust first proxy

// Configure express-session
app.use(
  session({
    secret: "your-secret-key", // Change this to a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, httpOnly: false,  sameSite: "none" }, // secure: true for HTTPS
  })
);



// Middleware to parse x-www-form-urlencoded data
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });



const allowedOrigins = ['https://techiweb.in', 'http://localhost:5173', 'https://mavyscrubs.com', 'www.mavyscrubs.com', 'https://www.mavyscrubs.com']; // Add all allowed origins here

const corsOptions = {
  origin: function (origin, callback) {
    // Check if the incoming origin is in the allowedOrigins array or if it's undefined (for non-browser clients)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Reject the request
    }
  },
  methods: ['GET', 'POST', 'DELETE'], // Allow specific HTTP methods
  credentials: true, // Allow credentials (cookies, tokens, etc.)
};

app.use(cors(corsOptions));




app.set('view engine', 'ejs');
app.use('/user', userRoutes);

app.get('/',(req,res)=>{
    res.send("/user route have all api for user")
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
