const FundModel = require("../model/Fund");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

// Add Fund
const addFund = asyncHandler(async (req, res) => {
  const fundbody = req.body;
  try {
    const fund = await FundModel.create(fundbody);
    res.status(200).json(fund);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//delete fund
const removeFund = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    throw new Error("Fund not found");
  }
  try {
    const fund = await FundModel.findByIdAndDelete(id);
    if (!fund) {
      res.status(400);
      throw new Error("Fund not found");
    }
    res.status(200).json(fund);
  } catch (error) {
    throw new Error(error.message);
  }
});

// View Funds
const viewAllFunds = asyncHandler(async (req, res) => {
  try {
    const funds = await FundModel.find({}).sort({ createdAt: -1 });
    res.status(200).json(funds);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// View Fund
const viewFund = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    throw new Error("Invalid mongoose id!");
  }
  try {
    const fund = await FundModel.findById(id);
    res.status(200).json(fund);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// Update Fund
const updateFund = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const fundbody = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    throw new Error("Invalid mongoose id!");
  }
  try {
    const fund = await FundModel.findByIdAndUpdate(id, fundbody, { new: true });
    res.status(200).json(fund);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = {
  addFund,
  viewAllFunds,
  viewFund,
  updateFund,
  removeFund,
};
