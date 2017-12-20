const controller = require('../../Controller/CakeController/AdminController.js')
var bodyParser = require('body-parser');
var multer = require('multer');
const express = require('express');
var router = express.Router();
var exports = [];
var storage = multer.diskStorage({
  destination : function(req,file,cb){cb(null,'./Upload')},
  filename : function(req,file,cb){cb(null,file.originalname)}
})

var upload = multer({storage : storage})
router.use('/InsertCake', controller.InsertCake);
router.use('/UploadCake',upload.single("file"),controller.UploadCake);
router.use('/CakeManage',controller.CakeManage);
router.use('/PrintCakeSearch?',controller.PrintCakeSearch);
router.use('/CakeSell',controller.CakeSell);
router.use('/NotCakeSell',controller.NotCakeSell);
router.use('/InfoUpdateCake',controller.InfoUpdateCake);
router.use('/UpdateCake',upload.single("file"),controller.UpdateCake);

module.exports = router;
