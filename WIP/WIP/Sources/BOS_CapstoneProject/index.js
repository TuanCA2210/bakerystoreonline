//1.require mongoose
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird');

const EventModel = require('./Model/EventSchema');
const BlogModel = require('./Model/BlogSchema');
//const humanModel = require('./Schema/HumanSchema');
const cakeTypeModel = require('./Model/CakeTypeSchema');
const BillModel = require('./Model/BillSchema');
const nodemailer = require('nodemailer');

//2.connect
const config = require('./config.json');
var url = config.connectionString;
var express = require("express");
var app = express();
var server = require("http").createServer(app);
var multer = require('multer');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var session      = require('express-session');
var cookieParser = require('cookie-parser');
var flash    = require('connect-flash');
var morgan       = require('morgan');
//cau hinh ejs
app.set("view engine","ejs");
app.set("views","./");
// call css
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
app.use(session({ secret: 'ILoveMyFamily' }));
app.use(cookieParser()); // sử dụng để đọc thông tin từ cookie
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(morgan('dev'));
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




// router and function login
//login admin
require('./Controller_Admin/Login')(passport);
app.get('/loginAD', function(req, res) {
    res.render('views/Admin/login', { message: req.flash('loginMessage') });
});

app.post('/loginAD', passport.authenticate('local-login', {
    successRedirect : '/Home',
    failureRedirect : '/loginAD'

}));

//login staff
app.get('/loginStaff', function(req, res) {
    res.render('views/Staff/login', { message: req.flash('loginMessage') });
});
app.post('/loginStaff', passport.authenticate('local-loginStaff', {
    successRedirect : '/HomeStaff',
    failureRedirect : '/loginStaff'

}));

//Login User
app.get('/login', function(req, res) {
    res.render('views/User/Login', { message: req.flash('loginMessage') });
});
app.post('/login', passport.authenticate('local-loginUser', {
    successRedirect : '/Profile',
    failureRedirect : '/login'

}));


//logout
 app.get('/logoutAD', function(req, res) {
     req.logout();
     res.redirect('/loginAD');
 });
 app.get('/logoutStaff', function(req, res) {
     req.logout();
     res.redirect('/loginStaff');
 });
 function isLoggedIn(req, res, next) {
     if (req.isAuthenticated('local-login') && req.user.role ==3)
         return next();
     res.redirect('/loginAD');
 };
 function isLoggedStaff(req, res, next) {
     if (req.isAuthenticated('local-loginStaff') && req.user.role ==2)
         return next();
     res.redirect('/loginStaff');
 };
 function isLoggedUser(req, res, next) {
     if (req.isAuthenticated('local-loginUser') && req.user.role ==1)
         return next();
     res.redirect('/login');
 };
//Password admin
app.use('/ForgotPasswordM', function(req,res){
    res.render('views/Admin/forgotPassword', { message: "" });
})

const passwordA = require('./Controller_Admin/ForgotPassword');
app.use('/RecoveryPasswordM',passwordA.ForgotPassword);


//Password staff

app.use('/ForgotPasswordS', function(req,res){
    res.render('views/Staff/forgotPassword', { message: "" });
})
const passwordS = require('./Controller_Staff/ForgotPasswordStaff');
app.use('/RecoveryPasswordS',passwordS.ForgotPassword);



app.get('/Home',isLoggedIn,function(req,res){
    res.render('views/Admin/Home',{username : req.user.name,link : req.user.linkImage})
})

app.get('/InputChangeMyPassword',isLoggedIn,function(req,res){
    res.render('views/Admin/ChangePassword',{message : "",username : req.user.name,link : req.user.linkImage})
})
const ad = require('./Controller_Admin/ChangePassword');
app.use('/ChangePassword',isLoggedIn,ad.ChangePassword);
//router account
const account = require('./Controller_Admin/Account');

app.use('/HumanManage',isLoggedIn, account.getAllAccount);
app.use('/PrintAccountSearch',isLoggedIn, account.getPrintAccountSearch);
app.get('/Staff',isLoggedIn,function(req,res){
      res.render("views/Admin/InsertStaff",{username : req.user.name,link : req.user.linkImage});
});
app.use('/InsertStaff',upload.single("file"),isLoggedIn, account.insertStaff);
app.use('/InfoUpdateStaff',isLoggedIn, account.InfoUpdateStaff);
app.use('/UpdateStaff',upload.single("file"),isLoggedIn,account.UpdateStaff);
app.use('/BlockUser',isLoggedIn, account.BlockUser);
app.use('/UnBlockUser' ,isLoggedIn, account.UnBlockUser);





// router cake
const cake = require('./Controller_Admin/Cake');
app.use('/InsertCake', isLoggedIn,cake.InsertCake);
app.use('/UploadCake',isLoggedIn,upload.single("file"),cake.UploadCake);
app.use('/CakeManage',isLoggedIn,cake.CakeManage);
app.use('/PrintCakeSearch?',isLoggedIn,cake.PrintCakeSearch);
app.use('/CakeSell',isLoggedIn,cake.CakeSell);
app.use('/NotCakeSell',isLoggedIn,cake.NotCakeSell);
app.use('/InfoUpdateCake',isLoggedIn,cake.InfoUpdateCake);
app.use('/UpdateCake',isLoggedIn,upload.single("file"),cake.UpdateCake);

//router Category
const category = require('./Controller_Admin/Category');
app.use('/Category',isLoggedIn,category.Category);
app.use('/InsertCategory',isLoggedIn,category.InsertCategory);
app.use('/CakeCategoryManage',isLoggedIn,category.CakeCategoryManage);
app.use('/LockCategory',isLoggedIn,category.LockCategory);
app.use('/UnLockCategory',isLoggedIn,category.UnLockCategory);

//router bill
const bill = require('./Controller_Admin/Bill');

app.use('/Bill',isLoggedIn,bill.Bill);
app.use('/BillSearch',isLoggedIn,bill.BillSearch);
app.use('/ConfirmBill',isLoggedIn,bill.ConfirmBill);
app.use('/UnConfirmBill',isLoggedIn,bill.UnConfirmBill);


//router Revenue
const revenue = require('./Controller_Admin/Revenue')
app.use('/Revenue',isLoggedIn, revenue.Revenue);
app.use('/RevenueSearch',isLoggedIn,revenue.RevenueSearch);
app.use('/RevenueSearchToday',isLoggedIn,revenue.RevenueSearchToday);
//router blog

const blog = require('./Controller_Admin/Blog')
app.use('/InsertBlog',isLoggedIn,blog.InsertBlog);
app.use('/UploadBlog',isLoggedIn,upload.any(),blog.UploadBlog);
app.use('/BlogManage',isLoggedIn,blog.BlogManage);
app.use('/SearchBlog',isLoggedIn,blog.SearchBlog);
app.use('/BLogDetail',isLoggedIn,blog.BlogDetail);
app.use('/LockBlog',isLoggedIn,blog.LockBlog);
app.use('/UnLockBlog',isLoggedIn,blog.UnLockBlog);



const event = require('./Controller_Admin/Event')
app.use('/InsertEvent', isLoggedIn,event.InsertEvent);
app.use('/UploadEvent',isLoggedIn,upload.single("file"),event.UploadEvent);
app.use('/ManageEvent',isLoggedIn,event.EventManage);
app.use('/SearchEvent',isLoggedIn,event.SearchEvent);
app.use('/LockEvent',isLoggedIn,event.LockEvent);
app.use('/UnLockEvent',isLoggedIn,event.UnLockEvent);




//Staff

app.get('/HomeStaff',isLoggedStaff,function(req,res){
    res.render('views/Staff/Home',{username : req.user.name,link : req.user.linkImage})
})

const cakeStaff = require('./Controller_Staff/Cake');
app.use('/CakeManageStaff',isLoggedStaff,cakeStaff.CakeManage);
app.use('/PrintCakeSearchStaff',isLoggedStaff,cakeStaff.PrintCakeSearch);


const billStaff = require('./Controller_Staff/Bill');
app.use('/BillStaff',isLoggedStaff,billStaff.Bill);
app.use('/BillSearchStaff',isLoggedStaff,billStaff.BillSearch);
app.use('/ConfirmBillStaff',isLoggedStaff,billStaff.ConfirmBill);
app.use('/UnConfirmBillStaff',isLoggedStaff,billStaff.UnConfirmBill);

// app.get('/UpdateInformation',isLoggedIn,function(req,res){
//     res.render('views/Staff/UpdateInformation',{})
// })
const accountStaff = require('./Controller_Staff/AccountStaff');
app.use('/UpdateInformation',isLoggedStaff, accountStaff.InfoUpdateStaff);
app.use('/UpdateInformationStaff',upload.single("file"),isLoggedStaff,accountStaff.UpdateStaff);


app.get('/InputChangePassword',isLoggedStaff,function(req,res){
    res.render('views/Staff/ChangePassword',{message : "",username : req.user.name,link : req.user.linkImage})
})

app.use('/ChangePasswordStaff',isLoggedStaff,accountStaff.ChangePassword);






app.get('/CreateIntroduction',isLoggedStaff,function(req,res){
    res.render('views/Staff/CreateIntroduction',{message:"",username : req.user.name,link : req.user.linkImage})
})
const introduction = require('./Controller_Staff/Introduction');

app.use('/InsertIntroduction',upload.single("file"),isLoggedStaff,introduction.InsertIntroduction);

app.get('/PreUpdateIntroduction',isLoggedStaff,introduction.PreUpdateIntroduction)
app.use('/UpdateIntroduction',isLoggedStaff,upload.single("file"),introduction.UpdateIntroduction)
// app.get('/UpdateIntroduction',isLoggedStaff,function(req,res){
//     res.render('views/Staff/UpdateIntroduction',{})
// })






















const user = require('./Controller_User/User')

//HomeCakes
app.use('/HomeCakes', user.HomeCakes);

//Cupcakes
app.use('/Cupcakes', user.Cupcakes);

//event
app.use('/Event', user.Event);

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


//Checkout
app.use('/CheckOut',user.CheckOut);
