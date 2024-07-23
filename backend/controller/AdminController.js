const AdminModel = require("../model/Admin");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

// Add a new Admin
const addAdmin = asyncHandler(async (req, res) => {
  const adminbody = req.body;
  try {
    if (
      adminbody.password.search(/[a-z]/) < 0 ||
      adminbody.password.search(/[A-Z]/) < 0 ||
      adminbody.password.search(/[0-9]/) < 0
    ) {
      res.status(400);
      throw new Error(
        "Password must contain at least one number, one capital letter, and one small letter"
      );
    }
    const admin = await AdminModel.create(adminbody);
    res.status(200).json(admin);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// Remove/Block Admin
const removeAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Admin not found");
  }
  try {
    const admin = await AdminModel.findByIdAndDelete(id);
    if (!admin) {
      res.status(400);
      throw new Error("Admin not found");
    }
    res.status(200).json(admin);
  } catch (error) {
    throw new Error(error.message);
  }
});

// View Admin
const viewAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Admin not found");
  }
  try {
    const admin = await AdminModel.findById(id);
    if (!admin) {
      throw new Error("Admin not found");
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// View all Admins
const viewAllAdmins = asyncHandler(async (req, res) => {
  try {
    const admins = await AdminModel.find({}).sort({ createdAt: -1 });
    res.status(200).json(admins);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// Update Admin
const updateAdmin = asyncHandler(async (req, res, next) => {
  console.log(req.params);
  let updatedAdmin = await AdminModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!updatedAdmin)
    return res.status(404).json({ message: "Admin not found!" });
  res.status(200).json({ message: "Admin Updated!", updatedAdmin });
});

module.exports = {
  addAdmin,
  removeAdmin,
  viewAdmin,
  viewAllAdmins,
  updateAdmin,
};
