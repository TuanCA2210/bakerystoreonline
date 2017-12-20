//1.require mongoose
const mongoose = require('mongoose')
// mongoose.Promise = global.Promise;
 // const cakeModel = require('./Model/CakeSchema');
// const EventModel = require('./Schema/EventSchema');
// const BlogModel = require('./Schema/BlogSchema');
// const humanModel = require('./Schema/HumanSchema');
// const cakeTypeModel = require('./Schema/CakeTypeSchema');
// const BillModel = require('./Schema/BillSchema');
const nodemailer = require('nodemailer');

//2.connect
const config = require('./config.json')
var url = config.connectionString;
var express = require("express");
var app = express();
var server = require("http").createServer(app);
var multer = require('multer')
var bodyParser = require('body-parser')
//cau hinh ejs
app.set("view engine","ejs");
app.set("views","./");

app.use(express.static(__dirname + '/views/Admin'));
app.use(express.static(__dirname + '/views/Staff'));
app.use(express.static(__dirname + '/views/User'));
app.use(express.static(__dirname + '/'));
server.listen(3000);
mongoose.connect(config.connectionString,(err)=>{
  if(err){
    console.log(err);
  }else {
    console.log('connect db success');;
  }
})


var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.urlencoded({
    extended: true
}));
// upload Image c
var storage = multer.diskStorage({
  destination : function(req,file,cb){cb(null,'./Upload')},
  filename : function(req,file,cb){cb(null,file.originalname)}
})

var upload = multer({storage : storage})


var passport = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var session      = require('express-session');
var cookieParser = require('cookie-parser');
var flash    = require('connect-flash');
var morgan       = require('morgan');
require('./controller/LoginController')(passport)
app.use(session({ secret: 'ILoveMyFamily' }));
app.use(cookieParser()); // sử dụng để đọc thông tin từ cookie
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(morgan('dev'));

app.get('/loginAD', function(req, res) {
    res.render('views/Admin/login', { message:  req.flash('loginMessage') });
});

app.post('/loginAD', passport.authenticate('local-login', {
    successRedirect : '/Home',
    failureRedirect : '/loginAD'

}));

app.get('/loginStaff', function(req, res) {
    res.render('views/Staff/login', { message:  req.flash('loginMessage') });
});

app.post('/loginStaff', passport.authenticate('local-loginStaff', {
    successRedirect : '/HomeStaff',
    failureRedirect : '/loginStaff'

}));

app.get('/Home',isLoggedIn,function(req,res){
    res.render('views/Admin/Home',{username : req.user.name,link : req.user.linkImage})
})
app.get('/HomeStaff',function(req,res){
    res.render('views/Staff/Home',{username : req.user.name,link : req.user.linkImage})
})

app.get('/CreateIntroduction',function(req,res){
    res.render('views/Staff/CreateIntroduction',{message:"",username : req.user.name,link : req.user.linkImage})
})

//
app.use('/ForgotPasswordS', function(req,res){
    res.render('views/Staff/forgotPassword', { message: "" });
})
const passwordS =  require('./Controller/HumanController/StaffController.js')
app.use('/RecoveryPasswordS',passwordS.ForgotPassword);


//Password admin
app.use('/ForgotPasswordM', function(req,res){
    res.render('views/Admin/forgotPassword', { message: "" });
})

const passwordA = require('./Controller/HumanController/AdminController.js')
app.use('/RecoveryPasswordM',passwordA.ForgotPassword);
//

app.use(require('./router/Admin/routerHuman'));

app.use(require('./router/Admin/routerCategory'));

app.use(require('./router/Admin/routerCake'));
app.use(require('./router/Admin/routerEvent'));
app.use(require('./router/Admin/routerBlog'));
app.use(require('./router/Admin/routerBill'));
app.use(require('./router/Admin/routerRevenue'));
//


app.use(require('./router/Staff/routerBill'));
app.use(require('./router/Staff/routerCake'));
app.use(require('./router/Staff/routerHuman'));
app.use(require('./router/Staff/routerIntroduction'));


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated('local-login') && req.user.role ==3){
console.log("Check Admin");
console.log(req.user.role);
        return next();
}
    res.redirect('/loginAD');
};
function isLoggedStaff(req, res, next) {

    if (req.isAuthenticated('local-loginStaff') && req.user.role ==2){
console.log("Check staff");
console.log(req.user.role);
        return next();
}
    res.redirect('/loginStaff');
};
function isLoggedUser(req, res, next) {
    if (req.isAuthenticated('local-loginUser') && req.user.role ==1)
        return next();
    res.redirect('/login');
};





const user = require('./Controller/UserController')

//HomeCakes
app.use('/HomeCakes', user.HomeCakes);

//Cupcakes
app.use('/Cupcakes', user.Cupcakes);

//DetailCake
app.use('/DetailCake', user.DetailCake);

//event
app.use('/Event', user.Event);

//Blog
app.use('/Blog', user.Blog);

//BlogDetail
app.use('/BlogDetail', user.BlogDetail);

//Profile
app.use('/Profile',isLoggedUser, user.Profile);

//Update
app.use('/Update',isLoggedUser,upload.single("file"), user.UpdateUser);


//signup
app.use('/signup', user.signup);

//Contact
app.use('/Contact', user.Contact);

//About
app.use('/About', user.About);


//Cart
app.use('/Cart', user.Cart);
