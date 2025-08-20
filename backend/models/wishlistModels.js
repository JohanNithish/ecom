const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const wishlistSchema = new mongoose.Schema({
  user: { type: ObjectId, required: true, unique: true }, // user reference
  products: [{ type: ObjectId }], // product reference
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now }
});

const wishlistModel = mongoose.model("wishlist", wishlistSchema);
module.exports = wishlistModel;

