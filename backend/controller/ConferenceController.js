const ConferenceModel = require("../model/Conference");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

// Add Conference
const addConference = asyncHandler(async (req, res) => {
  const conferencebody = req.body;
  try {
    const conference = await ConferenceModel.create(conferencebody);
    
    res.status(200).json(conference);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//delete conference
const removeConference = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    throw new Error("Conference not found");
  }
  try {
    const conference = await ConferenceModel.findByIdAndDelete(id);
    if (!conference) {
      res.status(400);
      throw new Error("Conference not found");
    }
    res.status(200).json(conference);
  } catch (error) {
    throw new Error(error.message);
  }
});

// View Conferencess
const viewAllConferences = asyncHandler(async (req, res) => {
  try {
    const conferences = await ConferenceModel.find({}).sort({ deadline: +1 });
    res.status(200).json(conferences);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// View Conference
const viewConference = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    throw new Error("Invalid mongoose id!");
  }
  try {
    const conference = await ConferenceModel.findById(id);
    res.status(200).json(conference);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// Update Conference
const updateConference = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const conferencebody = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    throw new Error("Invalid mongoose id!");
  }
  try {
    const conference = await ConferenceModel.findByIdAndUpdate(
      id,
      conferencebody,
      { new: true }
    );
    res.status(200).json(conference);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = {
  addConference,
  removeConference,
  viewAllConferences,
  viewConference,
  updateConference,
};
