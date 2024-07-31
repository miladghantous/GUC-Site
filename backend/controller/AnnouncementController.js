const AnnouncementModel = require("../model/Announcement");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

// Add Announcement (C)
const addAnnouncement = asyncHandler(async (req, res) => {
    const announementbody = req.body;

    try{
        const announcement = await AnnouncementModel.create(announementbody);
        res.status(200).json(announcement);
    }
    catch(error){
        res.status(400)
        throw new Error(error.message);
    }
});

// View Announcemet by ID (R)
const viewAnnouncement = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404);
      throw new Error("Invalid mongoose id!");
    }

    try {
      const announcement = await AnnouncementModel.findById(id);
      res.status(200).json(announcement);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });

// View all Announcements (R)
const viewAllAnnouncements = asyncHandler(async (req, res) => {

    try {
        const announcements = await AnnouncementModel.find({}).sort({ createdAt: -1 });
        res.status(200).json(announcements);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
});

// Update Announcement by ID (U)
const updateAnnouncement = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, image } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404);
        throw new Error("Invalid mongoose id!");
    }
    
    try {
        const announcement = await AnnouncementModel.findByIdAndUpdate(id,  req.body , { new:
            true });
            res.status(200).json(announcement);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
});

// Delete Announcement by ID (D)
const removeAnnouncement = asyncHandler(async (req, res) => {
    const { id } = req.params;
        
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404);
        throw new Error("Invalid mongoose id!");
        }

    try {
        const announcement = await AnnouncementModel.findByIdAndDelete(id);
        res.status(200).json(announcement);
        } catch (error) {
            res.status(400);
            throw new Error("Announcement not found");
        }
});
module.exports = {
    addAnnouncement,
    viewAnnouncement,
    viewAllAnnouncements,
    updateAnnouncement,
    removeAnnouncement,
  };
  





