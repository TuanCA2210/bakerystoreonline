const controller = require('../../Controller/HumanController/AdminController.js')
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
router.get('/HumanManage',controller.getListAccount);
router.get('/PrintAccountSearch',controller.getPrintAccountSearch);
router.get('/Staff',function(req,res){
      res.render("views/Admin/InsertStaff",{username : req.user.name,link : req.user.linkImage,message : ""});
});
router.post('/InsertStaff',upload.single('file'),controller.InsertStaff);
router.get('/InfoUpdateStaff', controller.InfoUpdateStaff);
router.post('/UpdateStaff',upload.single("file"),controller.UpdateStaff);
router.get('/BlockUser', controller.BlockUser);
router.get('/UnBlockUser' , controller.UnBlockUser);
router.get('/InputChangeMyPassword',function(req,res){
    res.render('views/Admin/ChangePassword',{message : "",username : req.user.name,link : req.user.linkImage})
})
router.use('/ChangePassword',controller.ChangePassword);
module.exports = router;
