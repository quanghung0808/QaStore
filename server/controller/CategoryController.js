const Category = require("../models/Category");
const Player = require("../models/Phone");
// @route GET api/categorys
// @desc GET category
// @access Private
const getAllCategories = async (req, res) => {
  try {
    const categorys = await Category.find().exec();
    res.json({ success: true, categorys });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// @route POST api/categorys
// @desc Create category
// @access Private
const addCategory = async (req, res) => {
  const data = req.body;
  try {
    // Check for existing categorys
    const existCategory = await Category.findOne({
      name: data.name,
    });
    if (existCategory)
      return res
        .status(400)
        .json({ success: false, message: "Category already taken" });
    const newCategory = new Category({
      name: data.name,
      description: data.description,
    });

    await newCategory.save();
    res.json({
      success: true,
      message: "Create new category successfully",
      category: newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// @route PUT api/categorys
// @desc PUT category
// @access Private
const updateCategory = async (req, res) => {
  try {
    const data = req.body;
    const existCategory = await Category.findOne({
      _id: { $nin: data.id },
      name: data.name,
    });
    if (existCategory)
      return res
        .status(400)
        .json({ success: false, message: "Category already taken" });
    const updateCategory = new Category({
      name: data.name,
      image: data.image,
      rank: data.rank,
      description: data.description,
    });

    const categoryDeleteCondition = { _id: data.id };
    await Category.findOneAndDelete(categoryDeleteCondition);
    await updateCategory.save();
    res.json({
      success: true,
      message: "Update category W",
      category: updateCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// @route DELETE api/categorys
// @desc DELETE category
// @access Private
const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const categoryDeleteCondition = { _id: categoryId };
    const existPhone = await Player.findOne({ category: categoryId });
    if (existPhone)
      return res.status(400).json({
        success: false,
        message:
          "This category cannot be deleted because there are players in it",
      });

    const deletedCategory = await Category.findOneAndDelete(
      categoryDeleteCondition
    );

    // User not authorised to delete the post
    if (!deletedCategory)
      return res.status(401).json({
        success: false,
        message: "Category not found or User not authorised",
      });
    res.json({
      success: true,
      message: "Delete Successfully!",
      category: deletedCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};
