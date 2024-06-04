const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id:{
      type: Number,
      required: false  
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: false // Corrected the typo
    },
    gender:{
        type: String,
        required: false // Corrected the typo
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;