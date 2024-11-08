require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 5000
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(express.json());  // To parse JSON bodies

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });


// const corsOptions = {
//   origin: 'https://techiweb.in/', // Replace with your Next.js app's domain
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
//   credentials: true, // Allow cookies to be sent
// };

// app.use(cors());

// app.use(cors({
//     origin: '*',  // or specify the domain like 'https://your-frontend-domain.com'
//     credentials: true,  // This allows the backend to accept credentials (cookies, etc.)
// }));
app.use(cors({
  origin: 'https://shree9nbhotels.in/', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true // If you need to send cookies or headers
}));
// app.use(cors({ credentials: true, origin: 'http://localhost:3000/' }));

app.set('view engine', 'ejs');
app.use('/user', userRoutes);

app.get('/',(req,res)=>{
    res.send("/user route have all api for user")
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
