const Product = require("../models/Product");

const createProduct = async (req, res) => {
  const { name, price, desc, category } = req.body;

  try {
    if (!name || !price || !desc || !category) {
      return res.status(404).json({ message: "Please provide all fields!!!" });
    } else {
      const product = new Product({ ...req.body });
      await product.save();
      res.status(200).json({ message: product });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Controller to get all task
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    if (!products)
      return res
        .status(401)
        .json({ message: "Unable to get a product. No product available" });
    res.status(200).json({ message: products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProductById = async (req, res) => {
  try {
    const { name, price, desc, productId } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: `No product with the id of ${productId}`,
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, price, desc },
      { new: true },
    );
    if (!updatedProduct)
      return res.status(401).json({
        message: `Unable to update any product!!! No product with the id of ${productId}`,
      });
    res.status(200).json({
      message: "Product updated successfully!!!",
      date: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteProductByID = async (req, res) => {
  try {
    const { productId } = req.body;

    // Find product first
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: `No product with the id of ${productId}`,
      });
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct)
      return res.status(401).json({
        message: `Unable to delete any product!!! No product with the id of ${productId}`,
      });
    res.status(200).json({ message: "Product deleted successfully!!!" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProductById,
  deleteProductByID,
};
