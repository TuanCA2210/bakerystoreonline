const controller = require('../../Controller/BillController/AdminController.js')
const express = require('express');
var router = express.Router();
var exports = [];
router.use('/Revenue', controller.Revenue);
router.use('/RevenueSearch',controller.RevenueSearch);
router.use('/RevenueSearchToday',controller.RevenueSearchToday);
module.exports = router;
