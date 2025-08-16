const productModel = require('../models/productModels');
const upload = require('../middleware/multer'); // Adjust path as needed

exports.insertProduct = async (req, res, next) => {
  try {
    // Handle multiple image uploads
    const imagePaths = req.files ? req.files.map(file => file.path) : [];

    // Transform metrics if sent as a comma-separated string or array of strings
    let metrics = [];
    if (req.body.metrics) {
      const metricsData = Array.isArray(req.body.metrics) ? req.body.metrics : [req.body.metrics];
      metrics = metricsData.map(value => ({ value: value.toString() }));
    }

    const productData = {
      category: req.body.category,
      productname: req.body.productname,
      url: req.body.url,
      sku: req.body.sku,
      mrp: parseFloat(req.body.mrp) || 0,
      offerprice: parseFloat(req.body.offerprice) || 0,
      images: imagePaths,
      metrics: metrics, // Use transformed metrics array
      description1: req.body.description1,
      description2: req.body.description2,
      detail: req.body.detail,
      information: req.body.information,
      status: parseInt(req.body.status, 10) || 1,
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

exports.putProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Handle multiple image uploads for update
    const imagePaths = req.files ? req.files.map(file => file.path) : undefined;

    // Transform metrics if sent as a comma-separated string or array of strings
    let metrics = undefined;
    if (req.body.metrics) {
      const metricsData = Array.isArray(req.body.metrics) ? req.body.metrics : [req.body.metrics];
      metrics = metricsData.map(value => ({ value: value.toString() }));
    }

    const updateData = {
      category: req.body.category,
      productname: req.body.productname,
      url: req.body.url,
      sku: req.body.sku,
      mrp: parseFloat(req.body.mrp),
      offerprice: parseFloat(req.body.offerprice),
      images: imagePaths,
      metrics: metrics,
      description1: req.body.description1,
      description2: req.body.description2,
      detail: req.body.detail,
      information: req.body.information,
      status: parseInt(req.body.status, 10),
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