const controller = require('../../Controller/BillController/AdminController.js')
const express = require('express');
var router = express.Router();
var exports = [];
router.use('/Bill',controller.Bill);
router.use('/BillSearch',controller.BillSearch);
router.use('/ConfirmBill',controller.ConfirmBill);
router.use('/UnConfirmBill',controller.UnConfirmBill);
module.exports = router;
