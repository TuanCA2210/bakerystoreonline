const controller = require('../../Controller/EventController.js')
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
router.use('/InsertEvent', controller.InsertEvent);
router.use('/UploadEvent',upload.single("file"),controller.UploadEvent);
router.use('/ManageEvent',controller.EventManage);
router.use('/SearchEvent',controller.SearchEvent);
router.use('/LockEvent',controller.LockEvent);
router.use('/UnLockEvent',controller.UnLockEvent);

module.exports = router;
