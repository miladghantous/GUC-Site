const asyncHandler = require("express-async-handler");

const checkInstructorRole = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.role === 'INSTRUCTOR') {
        next();
    } else {
        res.status(403)
        throw new Error('Access denied. You do not have the INSTRUCTOR role.')
    }
})

const checkAdminRole = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.role === 'ADMIN') {
        next();
    } else {
        res.status(403)
        throw new Error('Access denied. You do not have the Admin role.')
    }
})


module.exports = {
    checkInstructorRole,
    checkAdminRole,
}