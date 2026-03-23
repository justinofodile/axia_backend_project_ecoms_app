const express = require("express");

const adminMiddleware = require("../middlewares/adminMiddleware");
const {
  createProduct,
  getAllProducts,
  updateProductById,
  deleteProductByID,
} = require("../controllers/productController");

const productRouter = express.Router();

// Router to create product
productRouter
  .post("/create", adminMiddleware, createProduct)

  // Router to get all product by user
  .get("/getAllProduct", getAllProducts)

  // Router to update product by user
  .put("/updateProduct", adminMiddleware, updateProductById)

  // Router to delete product by user
  .delete("/deleteProduct", adminMiddleware, deleteProductByID);

module.exports = productRouter;
