const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const masterSchema = new mongoose.Schema({
    deals: String,
    description: String,
    createdBy: { type: ObjectId, ref: "users" },
    modifieBy: { type: ObjectId, ref: "users" },
    createdAt: Date,
    modifiedAt: Date    
});

const masterModel = mongoose.model('deals', masterSchema);

module.exports = masterModel;