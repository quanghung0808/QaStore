const express = require("express");
const {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/CategoryController");

const verifyToken = require("../middleware/auth");

const router = express.Router();

router.get("/", getAllCategories);
router.post("/", verifyToken, addCategory);
router.put("/:id", verifyToken, updateCategory);
router.delete("/:id", verifyToken, deleteCategory);

module.exports = {
  routes: router,
};
