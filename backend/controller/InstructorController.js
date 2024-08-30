const InstructorModel = require("../model/Instructor");
const UserModel = require("../model/User");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

// Add a new Instructor
const addInstructor = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, username, password } = req.body;
  try {
    if (
      password.search(/[a-z]/) < 0 ||
      password.search(/[A-Z]/) < 0 ||
      password.search(/[0-9]/) < 0
    ) {
      res.status(402);
      throw new Error(
        "Password must contain at least one number, one capital letter and one small letter"
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await UserModel.create({
      email,
      password: hashedPassword,
      role: "INSTRUCTOR",
    });
    const ins = await InstructorModel.create({
      username,
      password: password,
      email: email,
    });

    try {
      await sendEmail(email);
    } catch (error) {
      if (error.message === "Invalid Email") {
        console.log("inisde if invalid");
        return res.status(400).json({ error: "Invalid Email" });
      }
      throw error; // Re-throw if the error is something else
    }

    res.status(200).json(ins);
  } catch (error) {
    res.status(401);
    throw new Error(error.message);
  }
});

const sendEmail = async (email) => {
  console.log(email);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });
  //debug
  console.log("Email sent successfully**********.");

  const mailOptions = {
    from: {
      name: "GUC-Site",
      address: process.env.ETHEREAL_EMAIL,
    },
    to: email,
    subject: "Invite to join GUC Site",
    text: `Hello, you have been invited to join the GUC Site as an Instructor(professor). Your password is currently "Aa1". You can now login with this email an password "Aa1" . You can change your password after login.`,
  };
  //debug
  console.log("Email sent.");
  //Put try catch for transporter.sendemail
  try {
    console.log("Befrore transporter sendmail");

    await transporter.sendMail(mailOptions);
    console.log("after transporter sendmail");
  } catch (error) {
    throw new Error("Invalid Email", { cause: error });
  }
};

// Remove/Block Instructor
const removeInstructor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    throw new Error("Instructor not found");
  }
  try {
    const instructor = await InstructorModel.findByIdAndDelete(id);
    if (!instructor) {
      res.status(400);
      throw new Error("Instructor not found");
    }
    res.status(200).json(instructor);
  } catch (error) {
    throw new Error(error.message);
  }
});

// View Instructor
const viewInstructor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    throw new Error("Instructor not found");
  }
  try {
    const instructor = await InstructorModel.findById(id);
    if (!instructor) {
      throw new Error("Instructor not found");
    }
    res.status(200).json(instructor);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// View all Instructors
const viewAllInstructors = asyncHandler(async (req, res) => {
  try {
    const instructors = await InstructorModel.find({}).sort({ createdAt: -1 });
    res.status(200).json(instructors);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const updateInstructor = asyncHandler(async (req, res, next) => {
  console.log(req.params);
  let updatedInstructor = await InstructorModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!updatedInstructor)
    return res.status(404).json({ message: "Instructor not found!" });
  res.status(200).json({ message: "Instructor Updated!", updatedInstructor });
});

// Change password

module.exports = {
  addInstructor,
  removeInstructor,
  viewInstructor,
  viewAllInstructors,
  updateInstructor,
};
