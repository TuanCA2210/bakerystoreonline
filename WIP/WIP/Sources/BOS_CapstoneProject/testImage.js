var express = require('express');
var app = express();
var multer = require('multer')
app.set('view engine','ejs');
app.set("views","./views");

app.listen(3000,function(){
  console.log("connect success");
});


var storage = multer.diskStorage({
  destination : function(req,file,cb){cb(null,'./Upload')},
  filename : function(req,file,cb){cb(null,Date.now()+file.originalname)}
})

var upload = multer({storage : storage})
app.post('/UploadImage',upload.any(),function(req,res,next){
  console.log(req.files[1].path);
  console.log(req.files.length);

  res.send(req.files);
})
app.get('/', function (req, res,next){
    res.render('uploadAnh',{});
});
