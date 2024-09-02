const FileLinkModel = require("../model/FileLink");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

// Add File Link
const addFileLink = asyncHandler(async (req, res) => {
  const filelinkbody = req.body;
  console.log("Subject: ",filelinkbody.subject);
  console.log("link: ",filelinkbody.link);
  

  try {
    const filelink = await FileLinkModel.create(filelinkbody);
    res.status(200).json(filelink);
  } catch (error) {
    console.log(error.message);
    
    res.status(400);
    throw new Error(error.message);
  }
});

// Get All File Links
const viewAllFileLinks = asyncHandler(async (req, res) => {
  try {
    const fileLinks = await FileLinkModel.find().sort({ createdAt: -1 });
    res.status(200).json(fileLinks);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// Get a file link by ID
const viewFileLink = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    throw new Error("Instructor not found");
  }

  try {
    const fileLink = await FileLinkModel.findById(id);
    res.status(200).json(fileLink);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// Update file link by ID
const updateFileLink = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const filelinkbody = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    throw new Error("Instructor not found");
  }

  try {
    const fileLink = await FileLinkModel.findByIdAndUpdate(id, filelinkbody, {
      new: true,
    });
    res.status(200).json(fileLink);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// Delete file link by ID
const removeFileLink = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    throw new Error("Instructor not found");
  }

  try {
    const fileLink = await FileLinkModel.findByIdAndDelete(id);
    res.status(200).json(fileLink);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const searchBySubject = asyncHandler(async (req, res) => {
  let query = {};
  const { subject } = req.params;
  if (subject !== "") {
    query = {
      subject: { $regex: new RegExp(subject, "i") },
    };
  } else {
    res.status(400);
    throw new Error("Please enter a subject");
  }
  try {
    const links = await FileLinkModel.find(query);
    res.status(200).json(links);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

module.exports = {
  addFileLink,
  viewFileLink,
  viewAllFileLinks,
  updateFileLink,
  removeFileLink,
  searchBySubject,
};
