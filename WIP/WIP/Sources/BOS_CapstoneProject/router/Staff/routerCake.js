const controller = require('../../Controller/CakeController/StaffController.js')
var bodyParser = require('body-parser');
var multer = require('multer');
const express = require('express');
var router = express.Router();
var exports = [];

router.get('/CakeManageStaff',controller.CakeManage);
router.get('/PrintCakeSearchStaff',controller.PrintCakeSearch);

module.exports = router;
