const FundModel = require('../model/Fund')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')

// Add Fund
const addFund = asyncHandler(async (req, res) => {
    const fundbody = req.body
    try {
        const fund = await FundModel.create(fundbody)
        res.status(200).json(fund)
    }
    catch(error) {
        res.status(400)
        throw new Error(error.message)
    }
})

// View Funds
const viewFunds = asyncHandler(async (req, res) => {
    try {
        const funds = await FundModel.find({}).sort({createdAt: -1})
        res.status(200).json(funds)
    }
    catch(error) {
        res.status(400)
        throw new Error(error.message)
    }
})

// View Fund
const viewFund = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400)
        throw new Error('Invalid mongoose id!')
    }
    try {
        const fund = await FundModel.findById(id)
        res.status(200).json(fund)
    }
        catch(error) {
            res.status(400)
            throw new Error(error.message)
        }
})

// Update Fund
// Apply to a Fund

module.exports={
    addFund,
    viewFunds,
    viewFund,
}



