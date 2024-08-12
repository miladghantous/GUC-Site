const AdminModel = require("../model/Admin");
const UserModel = require("../model/User");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

// Add a new Admin
const addAdmin = asyncHandler(async (req, res) => {
  console.log("++++++++++++++++");
  const { username, password, email } = req.body;
  try {
    if (
      password.search(/[a-z]/) < 0 ||
      password.search(/[A-Z]/) < 0 ||
      password.search(/[0-9]/) < 0
    ) {
      res.status(400);
      throw new Error(
        "Password must contain at least one number, one capital letter and one small letter"
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("****************");
    const user = await UserModel.create({
      email,
      password: hashedPassword,
      role: "ADMIN",
    });
    const admin = await AdminModel.create({
      username,
      password: password,
      email: email,
    });
    await sendEmail(email);
    res.status(200).json(admin);
  } catch (error) {
    res.status(400);
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
    text: `Hello, you have been invited to join the GUC Site as an Admin. Your password is currently "Aa1". You can now login with this email an password = "Aa1" . You can change your password after login.`,
  };
  //debug
  console.log("Email sent.");
  await transporter.sendMail(mailOptions);
};

// Remove/Block Admin
const removeAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
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
    res.status(404);
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
