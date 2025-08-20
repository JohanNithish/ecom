const cartModel = require("../models/cartModels");

// Add (incremental, used when user "adds to cart" from product page)
exports.addCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, weight, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    const qty = Number(quantity) || 1;

    let cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      cart = await cartModel.create({
        user: userId,
        products: [{ productId, weight, quantity: qty }],
      });
      return res.json({ success: true, message: "Product added to cart", products: cart.products });
    }

    const existingIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId && p.weight === weight
    );

    if (existingIndex > -1) {
      cart.products[existingIndex].quantity += qty;
      if (cart.products[existingIndex].quantity <= 0) {
        cart.products.splice(existingIndex, 1);
      }
    } else {
      if (qty > 0) {
        cart.products.push({ productId, weight, quantity: qty });
      }
    }

    await cart.save();
    res.json({ success: true, message: "Cart updated", products: cart.products });
  } catch (error) {
    console.error("Cart add error:", error);
    res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
  }
};

// Change (absolute quantity, used from SideCart when + / - clicked)
exports.ChangeCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, weight, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    const qty = Number(quantity);

    let cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      if (qty > 0) {
        cart = await cartModel.create({
          user: userId,
          products: [{ productId, weight, quantity: qty }],
        });
        return res.json({ success: true, message: "Product added to cart", products: cart.products });
      } else {
        return res.json({ success: true, message: "Cart empty", products: [] });
      }
    }

    const existingIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId && p.weight === weight
    );

    if (existingIndex > -1) {
      if (qty <= 0) {
        // ✅ remove product
        cart.products.splice(existingIndex, 1);
      } else {
        // ✅ update to exact quantity
        cart.products[existingIndex].quantity = qty;
      }
    } else {
      if (qty > 0) {
        cart.products.push({ productId, weight, quantity: qty });
      }
    }

    await cart.save();

    res.json({ success: true, message: "Cart updated", products: cart.products });
  } catch (error) {
    console.error("Cart change error:", error);
    res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
  }
};

// Merge cart (used when guest logs in)
exports.mergeCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items } = req.body;

    if (!Array.isArray(items)) {
      return res.status(400).json({ success: false, message: "Items must be an array" });
    }

    let cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      cart = await cartModel.create({
        user: userId,
        products: items.map((i) => ({ ...i, quantity: Number(i.quantity) || 1 })),
      });
    } else {
      items.forEach((item) => {
        const qty = Number(item.quantity) || 1;
        const existingIndex = cart.products.findIndex(
          (p) => p.productId.toString() === item.productId && p.weight === item.weight
        );
        if (existingIndex > -1) {
          cart.products[existingIndex].quantity += qty;
        } else if (qty > 0) {
          cart.products.push({ ...item, quantity: qty });
        }
      });
      await cart.save();
    }

    res.json({ success: true, message: "Cart merged successfully", products: cart.products });
  } catch (error) {
    console.error("Cart merge error:", error);
    res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
  }
};

// Get user cart
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await cartModel
      .findOne({ user: userId })
      .populate("products.productId");

    res.json({ success: true, products: cart ? cart.products : [] });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
  }
};
