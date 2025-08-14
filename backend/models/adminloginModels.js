const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    username: String,
    password: String,
    usertype: Number
});

const adminLoginModel = mongoose.model('users', loginSchema);

module.exports = adminLoginModel;