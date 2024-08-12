const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const TaModel = require("../model/Ta");

// Add a new Ta
const addTa = asyncHandler(async (req, res) => {
  const tabody = req.body;
  try {
    const ta = await TaModel.create(tabody);
    res.status(200).json(ta);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const checkIfTaExists = asyncHandler(async (req, res) => {
  const { name } = req.body; // Destructure the name property from req.body
  console.log("Inside checkIfTaExists method");

  try {
    const ta = await TaModel.findOne({ name: name });

    if (ta) {
      console.log("Ta exists.");
      return res.status(200).json(ta);

    } else {
      console.log("Ta does not exist.");
      return res.status(200).json(null);
    }
  } catch (error) {
    console.log("7aga momyza");
    
    console.error("Error while checking if TA exists:", error);
    return res.status(500).json({ error: "An error occurred while checking if TA exists." });
  }
});

// Remove/Block Ta
const removeTa = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    throw new Error("Ta not found");
  }
  try {
    const ta = await TaModel.findByIdAndDelete(id);
    if (!ta) {
      res.status(400);
      throw new Error("Ta not found");
    }
    res.status(200).json(ta);
  } catch (error) {
    throw new Error(error.message);
  }
});

// View Ta
const viewTa = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    throw new Error("Ta not found");
  }
  try {
    const ta = await TaModel.findById(id);
    if (!ta) {
      throw new Error("Ta not found");
    }
    res.status(200).json(ta);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// View all Tas
const viewAllTas = asyncHandler(async (req, res) => {
  try {
    const tas = await TaModel.find({}).sort({ createdAt: -1 });
    res.status(200).json(tas);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const updateTa = asyncHandler(async (req, res, next) => {
  console.log(req.params);
  let updatedTa = await TaModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updatedTa) return res.status(404).json({ message: "Ta not found!" });
  res.status(200).json({ message: "Ta Updated!", updatedTa });
});

const searchByName = asyncHandler(async (req, res) => {
  let query = {};
  const { name } = req.params;
  if (name !== "") {
    query = {
      name: { $regex: new RegExp(name, "i") },
    };
  } else {
    res.status(400);
    throw new Error("Please enter a name");
  }
  try {
    const ta = await TaModel.find(query);
    res.status(200).json(ta);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

module.exports = {
  addTa,
  removeTa,
  viewTa,
  viewAllTas,
  updateTa,
  searchByName,
  checkIfTaExists
};
