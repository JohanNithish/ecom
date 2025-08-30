const productModel = require('../models/productModels');
const upload = require('../middleware/multer'); // Adjust path as needed

exports.insertProduct = async (req, res, next) => {
  try {
    // Handle multiple image uploads
    const imagePaths = req.files ? req.files.map(file => file.path) : [];

    // Transform metrics if sent as a comma-separated string or array of strings
    let price = [];
     if (req.body.price) {
      try {
        price = JSON.parse(req.body.price); // ✅ parse JSON string sent from frontend
      } catch (err) {
        return res.status(400).json({ success: false, message: "Invalid price format" });
      }
    }

    const productData = {
      category: req.body.category,
      deal: req.body.deal,
      productname: req.body.productname,
      url: req.body.url,
      sku: req.body.sku,
      images: imagePaths,
      price, // Use transformed metrics array
      description1: req.body.description1,
      description2: req.body.description2,
      detail: req.body.detail,
      information: req.body.information,
      status: parseInt(req.body.status, 10) || 1,
      isdeal: parseInt(req.body.isdeal, 10) || 0,
      createdBy: req.user ? req.user.id : null, // Set from authenticated user
      createdAt: new Date(),
    };

    const newProduct = await productModel.create(productData);

    res.json({
      success: true,
      message: "Insert Success",
      data: newProduct,
    });
  } catch (error) {
    console.error("Insert Error:", error);
    res.status(500).json({
      success: false,
      message: "Insert Failed",
      error: error.message,
    });
  }
};

exports.getAllProduct = async (req, res, next) => {
  try {
    const products = await productModel.find();
    res.json({
      success: true,
      message: "Get Success",
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Get Failed",
      error: error.message,
    });
  }
};


exports.getProduct = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const products = await productModel.findById(userId);
    res.json({
      success: true,
      message: "Get Success",
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Get Failed",
      error: error.message,
    });
  }
};


exports.getProductDetails = async (req, res, next) => {
  try {
    const url = req.params.url;
    const products = await productModel.findOne({ url: url });
    res.json({
      success: true,
      message: "Get Success",
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Get Failed",
      error: error.message,
    });
  }
};


exports.putProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const imagePaths = req.files ? req.files.map(file => file.path) : [];

    // Transform metrics if sent as a comma-separated string or array of strings
    let price = [];
     if (req.body.price) {
      try {
        price = JSON.parse(req.body.price); // ✅ parse JSON string sent from frontend
      } catch (err) {
        return res.status(400).json({ success: false, message: "Invalid price format" });
      }
    }
    const updateData = {
      category: req.body.category,
      deal: req.body.deal,
      productname: req.body.productname,
      url: req.body.url,
      sku: req.body.sku,
      images: imagePaths,
      price,
      description1: req.body.description1,
      description2: req.body.description2,
      detail: req.body.detail,
      information: req.body.information,
      status: parseInt(req.body.status, 10),
      isdeal: parseInt(req.body.isdeal, 10),
      modifiedBy: req.user ? req.user.id : null,
      modifiedAt: new Date(),
    };

    // Remove undefined fields to avoid overwriting
    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Update Success",
      data: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Update Failed",
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Delete Success",
      data: deletedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Delete Failed",
      error: error.message,
    });
  }
};


exports.searchProducts = async (req, res) => {
  try {
    const { category, q } = req.query; // category=All&q=phone

    let filter = {};

    if (category && category !== "All") {
      filter.category = category;
    }

    if (q) {
      // Search by product name or description1/description2
      filter.$or = [
        { productname: { $regex: q, $options: "i" } },
      ];
    }

    // Only return productname and url
    const products = await productModel.find(filter).select("productname url");

    res.json({
      success: true,
      message: "Search Success",
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Search Failed",
      error: error.message,
    });
  }
};
