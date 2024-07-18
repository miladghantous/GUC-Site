const ConferenceModel = require('../model/Conference')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')

// Add Conference
const addConference = asyncHandler(async (req, res) => {
    const conferencebody = req.body
    try {
        const conference = await ConferenceModel.create(conferencebody)
        res.status(200).json(conference)
    }
    catch(error) {
        res.status(400)
        throw new Error(error.message)
    }
})

// View Conferencess
const viewConferences = asyncHandler(async (req, res) => {
    try {
        const conferences = await ConferenceModel.find({}).sort({createdAt: -1})
        res.status(200).json(conferences)
    }
    catch(error) {
        res.status(400)
        throw new Error(error.message)
    }
})

// View Conference
const viewConference = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400)
        throw new Error('Invalid mongoose id!')
    }
    try {
        const conference = await ConferenceModel.findById(id)
        res.status(200).json(conference)
    }
        catch(error) {
            res.status(400)
            throw new Error(error.message)
        }
})

// Update Conference
// Apply to a Conference

module.exports={
    addConference,
    viewConferences,
    viewConference,
}



