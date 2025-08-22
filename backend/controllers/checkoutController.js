const Order = require('../models/orderModel');
const Cart = require('../models/cartModels');
const Product = require('../models/productModels');
const User = require('../models/registerModels'); // <-- import your user model

exports.addcheckout = async (req, res) => {
  const { userId, userDetails, payment_method } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    // ✅ Update user details in registration DB
    await User.findByIdAndUpdate(
      userId,
      { $set: userDetails },
      { new: true, runValidators: true }
    );

    // ✅ Process cart items
    const orderProducts = await Promise.all(
      cart.products.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) throw new Error(`Product not found: ${item.productId}`);

        // find correct price for selected weight
        const selectedPrice = product.price.find(p => p.metric === item.weight);
        const price = selectedPrice ? selectedPrice.offerprice : 0;

        return {
          productId: item.productId,
          name: product.productname,
          price,
          quantity: item.quantity,
          weight: item.weight  // ✅ make sure weight is added
        };
      })
    );

    // ✅ Save order with weight info
    const order = new Order({
      userId,
      userDetails,
      products: orderProducts,
      payment_method
    });

    await order.save();

    // clear cart
    await Cart.findOneAndUpdate({ user: userId }, { $set: { products: [] } });

    return res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      orderId: order._id
    });

  } catch (err) {
    console.error('Checkout failed:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getOrders = async (req, res) => {
  const { userId } = req.params; // assuming /orders/:userId

  if (!userId) {
    return res.status(400).json({ success: false, message: 'User ID is required' });
  }

  try {
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(200).json({ success: true, message: 'No orders found', orders: [] });
    }

    return res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error('Fetch orders failed:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find(); // fetch all users
    res.json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};