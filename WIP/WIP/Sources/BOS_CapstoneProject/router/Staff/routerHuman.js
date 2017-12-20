const controller = require('../../Controller/HumanController/StaffController.js')
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
router.get('/UpdateInformation', controller.InfoUpdateStaff);
router.post('/UpdateInformationStaff',upload.single("file"),controller.UpdateStaff);


router.get('/InputChangePassword',function(req,res){
    res.render('views/Staff/ChangePassword',{message : "",username : req.user.name,link : req.user.linkImage})
})

router.post('/ChangePasswordStaff',controller.ChangePassword);

module.exports = router;
