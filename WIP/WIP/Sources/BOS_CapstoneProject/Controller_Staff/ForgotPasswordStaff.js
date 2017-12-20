const nodemailer = require('nodemailer');
const mongoose = require('mongoose')
const humanModel = require('../Schema/HumanSchema');
var randomstring = require("randomstring");
var express = require("express");
const config = require('../config.json')
var url = config.connectionString;
var app = express();
var exports = {};
exports.ForgotPassword = function(req,res){
  var email = req.body.account.email;
  humanModel.findOne({ email :  email, role : 2  }, function(err, user) {
    if(!user){
        res.render("views/Admin/forgotPassword", {message: "Email not exist"});
    }else{
      var newpassword = randomstring.generate({
        length: 12,
        charset: 'alphanumeric'
      });
      console.log(newpassword);
      humanModel.update({email : email},{password : newpassword}).exec((err,result)=>{console.log(result)});
      nodemailer.createTestAccount((err, account) => {

          // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport('smtps://hoibanbanh%40gmail.com:123321AA@smtp.gmail.com');

          // setup email data with unicode symbols
          let mailOptions = {
              from: '"HoiBanBanh 👻" <foo@blurdybloop.com>', // sender address
              to: email, // list of receivers
              subject: 'Reset Password ✔', // Subject line
              text: 'Reset Password', // plain text body
              html: '<b>This is new Password : '+newpassword +'  </b>' // html body
          };

          // send mail with defined transport object
          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  return console.log(error);
              }
              console.log('Message sent: %s', info.messageId);
              // Preview only available when sending through an Ethereal account
              console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

              // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
              // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
          });
      });
      res.render('views/Staff/login',{message : "password has been sent to your email"});
    }
})
}


module.exports =  exports;
