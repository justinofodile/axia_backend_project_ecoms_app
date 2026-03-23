const Category = require("../models/Category");

const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    if (!name) return res.status(404).json({ message: "Name is required!!!" });

    const category = await Category.findOne({ name });
    // const category = new Task({ ...req.body, user: req.user.id });
    if (category)
      return res.status(401).json({ message: "Category already exist!!!" });

    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json({ message: "Category added successfully!!!" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = createCategory;
