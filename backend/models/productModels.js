const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    ref: "category"
  },
  productname: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  mrp: {
    type: Number,
    required: true,
  },
  offerprice: {
    type: Number,
    required: true,
  },
  images: [{
    type: String, // Store image paths or URLs
  }],
  metrics: [{
    value: String, // Store only the value
  }],
  description1: {
    type: String,
    required: true,
  },
  description2: {
    type: String,
  },
  detail: {
    type: String,
  },
  information: {
    type: String,
  },
  status: {
    type: Number,
    required: true,
    default: 1, // 1 for active, 0 for inactive
  },
  createdBy: {
    type: ObjectId,
    ref: 'users', // Reference to user model if applicable
    default: null, // No default ObjectId unless set by middleware
  },
  updatedBy: {
    type: ObjectId,
    ref: 'users', // Reference to user model if applicable
    default: null, // No default ObjectId unless set by middleware
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const productModel = mongoose.model('product', productSchema);

module.exports = productModel;