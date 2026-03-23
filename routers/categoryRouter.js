const express = require("express");
const createCategory = require("../controllers/categoryController");
const adminMiddleware = require("../middlewares/adminMiddleware");

const categoryRouter = express.Router();

// Router to create task
categoryRouter.post("/create", adminMiddleware, createCategory);

module.exports = categoryRouter;
