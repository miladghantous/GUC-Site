const express = require('express');
const router = express.Router();


const {
    addFund,
    viewAllFunds,
    viewFund,
    updateFund,
    removeFund,
} = require('../controller/FundController')

router.post('/addFund',addFund)
router.get('/viewFund/:id',viewFund)
router.get('/viewAllFunds',viewAllFunds)
router.put('/updateFund/:id',updateFund)
router.delete('/removeFund/:id',removeFund)


module.exports = router
