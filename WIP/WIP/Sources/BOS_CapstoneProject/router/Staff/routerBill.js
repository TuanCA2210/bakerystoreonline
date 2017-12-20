const controller = require('../../Controller/BillController/StaffController.js')
const express = require('express');
var router = express.Router();
var exports = [];
router.get('/BillStaff',controller.Bill);
router.get('/BillSearchStaff',controller.BillSearch);
router.get('/ConfirmBillStaff',controller.ConfirmBill);
router.get('/UnConfirmBillStaff',controller.UnConfirmBill);
router.get('/Seen',controller.Seen);
router.get('/updateNote',controller.updateNote);
module.exports = router;
