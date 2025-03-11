const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./userModel');  //Import user model
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 9748; 
const bcrypt = require('bcrypt');

app.use(express.json()); //To parse JSON request body
app.use(cors()); 


//Connect to MongoDB using the URI from the .env file
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

//Routes

//Registration route
app.post('/register', async (req, res) => {
    const { username, password} = req.body;

    //user validation
    if (!username || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    //Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    //Create new user
    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
});

//Login route
app.post('/login', async (req, res) => {
    const { username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
        return res.status(400).json({ message: 'Username or password was incorrect' });
    }
    
    const validPassword = await existingUser.comparePassword(password);

    if (!validPassword){
        return res.status(400).json({ message: 'Username or password was incorrect' });
    }

    else{
        return res.status(200).json({message: 'login successful'});
    }
});


app.listen(PORT, () => {
    console.log(`Login service running on port ${PORT}`);
});
