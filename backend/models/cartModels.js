const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const cartSchema = new mongoose.Schema({
  user: { type: ObjectId, required: true, unique: true }, // user reference
  products: [
    {
      productId: { type: ObjectId, required: true },
      weight: { type: String }, // metric like "1kg", "500g"
      quantity: { type: Number, default: 1, min: 1 },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
});


const cartModel = mongoose.model("cart", cartSchema);
module.exports = cartModel;
