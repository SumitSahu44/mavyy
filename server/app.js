const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 4000
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());  // To parse JSON bodies

mongoose.connect('mongodb://localhost:27017/modules').then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Error connecting to MongoDB:', error);
});

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your Next.js app's domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
  credentials: true, // Allow cookies to be sent
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
