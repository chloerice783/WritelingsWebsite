const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Define user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,  //Ensure the username is unique
    },
    password: {
        type: String,
        required: true,
    },
});

//Hash password before saving to database
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

//Compare provided password with stored hashed password
userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

//Create User model. Contains list of users.
const User = mongoose.model('User', userSchema);

module.exports = User;
