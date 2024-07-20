const express = require('express');
const router = express.Router();


const {
    addFund,
    viewFunds,
    viewFund,
} = require('../controller/FundController')

router.post('/addFund',addFund)
router.get('/getFund/:id',viewFund)
router.get('/getAllFunds',viewFunds)


module.exports = router
