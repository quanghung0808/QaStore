const Nation = require("../models/Nation");
const Player = require("../models/Player");
// @route GET api/nations
// @desc GET nation
// @access Private
const getAllNations = async (req, res) => {
  try {
    const nations = await Nation.find().exec();
    res.json({ success: true, nations });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// @route POST api/nations
// @desc Create nation
// @access Private
const addNation = async (req, res) => {
  const data = req.body;
  try {
    // Check for existing nations
    const existNation = await Nation.findOne({
      name: data.name,
    });
    if (existNation)
      return res
        .status(400)
        .json({ success: false, message: "Nation already taken" });
    const existRank = await Nation.findOne({
      rank: data.rank,
    });
    if (existRank)
      return res
        .status(400)
        .json({ success: false, message: "Rank already taken" });
    const newNation = new Nation({
      name: data.name,
      image: data.image,
      rank: data.rank,
      description: data.description,
    });

    await newNation.save();
    res.json({
      success: true,
      message: "Create new nation successfully",
      nation: newNation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// @route PUT api/nations
// @desc PUT nation
// @access Private
const updateNation = async (req, res) => {
  try {
    const data = req.body;
    const existNation = await Nation.findOne({
      _id: { $nin: data.id },
      name: data.name,
    });
    if (existNation)
      return res
        .status(400)
        .json({ success: false, message: "Nation already taken" });
    const existRank = await Nation.findOne({
      _id: { $nin: data.id },
      rank: data.rank,
    });
    if (existRank)
      return res
        .status(400)
        .json({ success: false, message: "Rank already taken" });
    const updateNation = new Nation({
      name: data.name,
      image: data.image,
      rank: data.rank,
      description: data.description,
    });

    const nationDeleteCondition = { _id: data.id };
    await Nation.findOneAndDelete(nationDeleteCondition);
    await updateNation.save();
    res.json({
      success: true,
      message: "Update nation successfully",
      nation: updateNation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// @route DELETE api/nations
// @desc DELETE nation
// @access Private
const deleteNation = async (req, res) => {
  try {
    const nationId = req.params.id;
    const nationDeleteCondition = { _id: nationId };
    const existPlayer = await Player.findOne({ nation: nationId });
    if (existPlayer)
      return res.status(400).json({
        success: false,
        message:
          "This nation cannot be deleted because there are players in it",
      });

    const deletedNation = await Nation.findOneAndDelete(nationDeleteCondition);

    // User not authorised to delete the post
    if (!deletedNation)
      return res.status(401).json({
        success: false,
        message: "Post not found or User not authorised",
      });
    res.json({
      success: true,
      message: "Delete Successfully!",
      nation: deletedNation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  getAllNations,
  addNation,
  updateNation,
  deleteNation,
};
