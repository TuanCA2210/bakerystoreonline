const controller = require('../../Controller/BlogController.js')
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
router.use('/InsertBlog',controller.InsertBlog);
router.use('/UploadBlog',upload.any(),controller.UploadBlog);
router.use('/BlogManage',controller.BlogManage);
router.use('/SearchBlog',controller.SearchBlog);
router.use('/BLogDetailAdmin',controller.BlogDetail);
router.use('/LockBlog',controller.LockBlog);
router.use('/UnLockBlog',controller.UnLockBlog);

module.exports = router;
