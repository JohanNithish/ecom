const wishlistModel = require("../models/wishlistModels");

// 🔹 Toggle Wishlist (add/remove product)

exports.addWishlist = async (req, res) => {
  try {
    const userId = req.user.id; // from middleware
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    // Find user's wishlist
    let wishlist = await wishlistModel.findOne({ user: userId });

    if (!wishlist) {
      // create new wishlist with this product
      wishlist = await wishlistModel.create({
        user: userId,
        products: [productId],
      });
      return res.json({
        success: true,
        message: "Product added to wishlist",
        added: true,
        products: wishlist.products,
      });
    }

    // check if product already exists in array
    const productIndex = wishlist.products.indexOf(productId);

    if (productIndex > -1) {
      // remove product
      wishlist.products.splice(productIndex, 1);
      await wishlist.save();
      return res.json({
        success: true,
        message: "Removed from wishlist",
        added: false,
        products: wishlist.products,
      });
    } else {
      // add product
      wishlist.products.push(productId);
      await wishlist.save();
      return res.json({
        success: true,
        message: "Added to wishlist",
        added: true,
        products: wishlist.products,
      });
    }
  } catch (error) {
    console.error("Wishlist toggle error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};


exports.mergeWishlist = async (req, res) => {
  try {
    const userId = req.user.id; // from middleware
    const { items } = req.body; // expect an array of productIds

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: "Items must be an array of product IDs",
      });
    }

    // Find user's wishlist
    let wishlist = await wishlistModel.findOne({ user: userId });

    if (!wishlist) {
      // Create new wishlist if none exists
      wishlist = await wishlistModel.create({
        user: userId,
        products: [...new Set(items)], // avoid duplicates
      });
    } else {
      // Merge existing + new items (no duplicates)
      const mergedProducts = new Set([
        ...wishlist.products.map(p => p.toString()),
        ...items,
      ]);
      wishlist.products = Array.from(mergedProducts);
      await wishlist.save();
    }

    return res.json({
      success: true,
      message: "Wishlist merged successfully",
      products: wishlist.products,
    });
  } catch (error) {
    console.error("Wishlist merge error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};


// 🔹 Get User Wishlist
exports.getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the wishlist for this user and populate products
    const wishlist = await wishlistModel
      .findOne({ user: userId })
      .populate("products"); // 'products' must match schema field

    res.json({
      success: true,
      products: wishlist ? wishlist.products : [],
    });
  } catch (error) {
    console.error("Get wishlist error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
