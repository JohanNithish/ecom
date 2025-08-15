const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const masterSchema = new mongoose.Schema({
    category: String,
    description: String,
    createdBy: { type: ObjectId, ref: "users" },
    modifieBy: { type: ObjectId, ref: "users" },
    createdAt: Date,
    modifiedAt: Date    
});

const masterModel = mongoose.model('category', masterSchema);

module.exports = masterModel;