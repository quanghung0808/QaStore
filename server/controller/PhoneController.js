const express = require("express");
const Phone = require("../models/Phone");

// @route GET api/phones
// @desc GET phone
// @access Private
const getAllPhones = async (req, res) => {
  try {
    const phones = await Phone.find().exec();
    res.json({ success: true, phones });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// @route POST api/phones
// @desc Create phone
// @access Private
const addPhone = async (req, res) => {
  const data = req.body;
  try {
    const newPhone = new Phone({
      name: data.name,
      image: data.image,
      category: data.category,
      price: data.price,
      os: data.os,
      size: data.size,
      pin: data.pin,
      ram: data.ram,
      description: data.description,
    });

    await newPhone.save();
    res.json({
      success: true,
      message: "Create new phone successfully",
      phone: newPhone,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// @route PUT api/phones
// @desc PUT phone
// @access Private
const updatePhone = async (req, res) => {
  try {
    const data = req.body;
    const updatePhone = new Phone({
      name: data.name,
      image: data.image,
      category: data.category,
      price: data.price,
      os: data.os,
      size: data.size,
      pin: data.pin,
      ram: data.ram,
      description: data.description,
    });

    const phoneDeleteCondition = { _id: data.id };
    await Phone.findOneAndDelete(phoneDeleteCondition);
    await updatePhone.save();
    res.json({
      success: true,
      message: "Update phone successfully",
      phone: updatePhone,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// @route DELETE api/phones
// @desc DELETE phone
// @access Private
const deletePhone = async (req, res) => {
  try {
    const phoneDeleteCondition = { _id: req.params.id };
    const deletedPhone = await Phone.findOneAndDelete(phoneDeleteCondition);

    // User not authorised to delete the post
    if (!deletedPhone)
      return res.status(401).json({
        success: false,
        message: "Post not found or User not authorised",
      });
    res.json({
      success: true,
      message: "Delete Successfully!",
      phone: deletedPhone,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  getAllPhones,
  addPhone,
  updatePhone,
  deletePhone,
};
