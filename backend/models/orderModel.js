const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'registration', required: true },

  // User Details & Delivery Address
  userDetails: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    postCode: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String },
  },

  // Products
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      weight: { type: String, required: true },
    }
  ],

  // Payment
  payment_method: { type: String, required: true },
 payment_id: { type: String },
  // Status
  status: { type: String, default: 'Pending' }, // Pending, Completed, Cancelled

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('order', orderSchema);
