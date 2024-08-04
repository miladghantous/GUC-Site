const ComplaintModel = require("../model/Complaint");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

// Add Complaint (C)
const addComplaint = asyncHandler(async (req, res) => {
  const announementbody = req.body;

  try {
    const complaint = await ComplaintModel.create(announementbody);
    res.status(200).json(complaint);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// View Announcemet by ID (R)
const viewComplaint = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    throw new Error("Invalid mongoose id!");
  }

  try {
    const complaint = await ComplaintModel.findById(id);
    res.status(200).json(complaint);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// View all Complaints (R)
const viewAllComplaints = asyncHandler(async (req, res) => {
  try {
    const complaints = await ComplaintModel.find({}).sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// Update Complaint by ID (U)
const updateComplaint = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    throw new Error("Invalid mongoose id!");
  }

  try {
    const complaint = await ComplaintModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(complaint);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// Delete Complaint by ID (D)
const removeComplaint = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    throw new Error("Invalid mongoose id!");
  }

  try {
    const complaint = await ComplaintModel.findByIdAndDelete(id);
    res.status(200).json(complaint);
  } catch (error) {
    res.status(400);
    throw new Error("Complaint not found");
  }
});

module.exports = {
  addComplaint,
  viewComplaint,
  viewAllComplaints,
  updateComplaint,
  removeComplaint,
};
