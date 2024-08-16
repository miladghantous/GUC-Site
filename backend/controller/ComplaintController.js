const ComplaintModel = require("../model/Complaint");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const UserModel = require("../model/User");
const InstructorModel = require("../model/Instructor");

// Add Complaint (C)
const addComplaint = asyncHandler(async (req, res) => {
  const complaintbody = req.body;
  const id = req.user.id;
  const user = await UserModel.findById(id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  console.log("inside addComp and this userId :  "+ id);
  
  try {
    const complaint = await ComplaintModel.create({
      owner: id,
      title: complaintbody.title,
      details: complaintbody.details,
      status: complaintbody.status,
      reply: complaintbody.reply,
    });
    res.status(200).json(complaint);
  } catch (error) {
    console.log("inside add comp controller (catch): " +error);
    
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

const changeStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    throw new Error("Invalid mongoose id!");
  }
  try {
    const complaint = await ComplaintModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.status(200).json(complaint);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const editReply = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { reply } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    throw new Error("Invalid mongoose id!");
  }
  try {
    const complaint = await ComplaintModel.findByIdAndUpdate(
      id,
      { reply },
      { new: true }
    );
    res.status(200).json(complaint);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const getUserComplaints = asyncHandler(async (req, res) => {
  console.log("I am in user comp controller: ");

  // const { id } = req.params;
  const loggedInUserID = req.user.id;
  console.log("I am in controller and this is user id: " + loggedInUserID);

  try {
    const user = await UserModel.findOne({ _id: loggedInUserID });

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    console.log(user);
    

    const complaints = await ComplaintModel.find({ owner: loggedInUserID });
    console.log(complaints);
    

    // if (!complaints || complaints.length === 0) {
    //   console.log("Error in backend: No complaints found for this user");
      
    //   return res
    //     .status(404)
    //     .json({ message: "No complaints found for this user" });
    // }

    return res.status(200).json(complaints);
  } catch (error) {
    console.error("Error while fetching user complaints:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching user complaints" });
  }
});

module.exports = {
  addComplaint,
  viewComplaint,
  viewAllComplaints,
  updateComplaint,
  removeComplaint,
  changeStatus,
  editReply,
  getUserComplaints,
};
