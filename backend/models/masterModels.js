const mongoose = require('mongoose');

const masterSchema = new mongoose.Schema({
    category: String,
    description: String,
    createdBy: Number,
    modifieBy: Number,
    createdAt: Date,
    modifiedAt: Date
});

const masterModel = mongoose.model('category', masterSchema);

module.exports = masterModel;