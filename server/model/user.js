const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, 
    },
    email: {
        type: String,
        required: true, 
        unique: true,   
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 
            "Please provide a valid email address.",
        ],
    },
    password: {
        type: String,
        required: true, 
        minlength: 6,   
    },
    userImageUrl: {
        type: String,
        unique: true,
        default: "https://res.cloudinary.com/djrdw0sqz/image/upload/v1725100842/myImg_q3lyty.jpg"
    },
    userCart: {
        wishlist: {
            type: Array, 
            default: [],
        },
        cart: {
            type: Array, 
            default: [],
        },
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
