const InstructorModel = require('../model/Instructor')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')

// Add a new Instructor
const addInstructor = asyncHandler(async (req, res) => {
    const instructorbody = req.body
    try {
        if (instructorbody.password.search(/[a-z]/) < 0 || instructorbody.password.search(/[A-Z]/) < 0 || instructorbody.password.search(/[0-9]/) < 0) {
            res.status(400)
            throw new Error("Password must contain at least one number, one capital letter and one small letter")
        }
        const instructor = await InstructorModel.create(instructorbody)
        res.status(200).json(instructor)

    }
    catch (error) {
        res.status(400)
        throw new Error(error.message)
    }

})

// Remove/Block Instructor
const removeInstructor = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400)
        throw new Error('Instructor not found')
    }
    try {
        const instructor = await InstructorModel.findByIdAndDelete(id)
        if (!instructor) {
            res.status(400)
            throw new Error('Instructor not found')
        }
        res.status(200).json(instructor)
    }
    catch (error) {
        throw new Error(error.message)
    }
})


// View Instructor
const viewInstructor = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400)
        throw new Error('Instructor not found')
    }
    try {
        const instructor = await InstructorModel.findById(id)
        if (!instructor) {
            throw new Error('Instructor not found')
        }
        res.status(200).json(instructor)
    }
    catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

// View all Instructors
const viewAllInstructors = asyncHandler(async (req, res) => {
    try {
        const instructors = await InstructorModel.find({}).sort({ createdAt: -1 })
        res.status(200).json(instructors)
    }
    catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

const updateInstructor = asyncHandler(async (req, res, next) => {
    console.log(req.params);
    let updatedInstructor = await InstructorModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedInstructor) return res.status(404).json({ message: "Instructor not found!" })
    res.status(200).json({ message: "Instructor Updated!", updatedInstructor })
})


// Change password


module.exports = {
    addInstructor,
    removeInstructor,
    viewInstructor,
    viewAllInstructors,
    updateInstructor
}




