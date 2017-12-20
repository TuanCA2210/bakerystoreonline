const mongoose = require('mongoose')
const humanModel = require('../Schema/HumanSchema');

var express = require("express");
const config = require('../config.json')
var url = config.connectionString;
var app = express();
var exports = {};




exports.InfoUpdateStaff = function(req,res){
  var o_id = req.user._id;

// var o_id = req.param('id');

  var id = require('mongodb').ObjectID(o_id);
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection("Human").find({ _id: id}).toArray(function(err, result) {
      if(result.length > 0 ){
        res.render("views/Staff/UpdateInformation", {result: result,message: "",username : req.user.name,link : req.user.linkImage})
        db.close();
      }else{
          db.collection("Human").find().toArray(function(err, result) {
          res.render("views/Staff/UpdateInformation", {result : result,username : req.user.name,link : req.user.linkImage})
          db.close();
      })
    }

  });
    });
}
exports.UpdateStaff = function(req,res){
  var o_id = req.body.staff.id;
  var id = require('mongodb').ObjectID(o_id);
  var file = req.file;
  console.log(o_id);
  var MongoClient = require('mongodb').MongoClient
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var myquery = { _id : id };

  var email = req.body.staff.email;
  var phone = req.body.staff.phone;

  db.collection("Human").find({
  $or: [
	     {email: email}, {phone:phone}
      ]}).toArray(function(err,result){
      if(result.length <=1 ){
          if(!file){
            console.log("khong co img");
            var newvalues = {
              name: req.body.staff.name,
              address: req.body.staff.address ,
              phone : phone,
              email : email ,
              note :  req.body.staff.note,
              date_update : new Date()  };
              db.collection("Human").updateOne(myquery, {$set :newvalues}, function(err, result) {
                db.close();
              });

        }else{
          console.log("cos img");
          var newvalues = {
            name: req.body.staff.name,
            address: req.body.staff.address ,
            phone : phone,
            email : email ,
            note :  req.body.staff.note,
            linkImage : req.file.path,
            date_update : new Date()  };
            db.collection("Human").updateOne(myquery, {$set :newvalues}, function(err, result) {
              db.close();
            });
        }
      }else{
          db.collection("Human").find({ _id: id}).toArray(function(err, result)  {
          if(result.length > 0 ){
            res.render("views/Staff/UpdateInformation", {result: result,message:"phone or email has been exist",username : req.user.name,link : req.user.linkImage})
            db.close();
          }
      });
      }

})
  //humanModel.update({ _id : id },newvalues).exec((err,result) =>{console.log(result)});
  db.collection("Human").find({ _id: id}).toArray(function(err, result) {
  res.render("views/Staff/UpdateInformation", {result : result,username : req.user.name,link : req.user.linkImage})
  db.close();
})
});
}
exports.ChangePassword = function(req,res){
  var old_password = req.body.staff.oldpassword;
  var new_password = req.body.staff.newpassword;
  var re_password = req.body.staff.repassword;
  var o_id = req.user._id;
  var id = require('mongodb').ObjectID(o_id);
  humanModel.findOne({ _id :  id }, function(err, user) {
      if(user.password == old_password)
      {
          if(new_password == re_password && new_password != old_password)
          {
              humanModel.update({_id : id},{password : new_password}).exec((err,result)=>{console.log(result)});
              res.render("views/Admin/ChangePassword", {message : "Change successful" ,username : req.user.name,link : req.user.linkImage})
          } else if(new_password != re_password && new_password == old_password){
              res.render("views/Admin/ChangePassword", {message : "new password and old password must be the different each" ,username : req.user.name,link : req.user.linkImage})
          }else if(new_password != re_password && new_password != old_password){
              res.render("views/Admin/ChangePassword", {message : "new password and repassword must be the same" ,username : req.user.name,link : req.user.linkImage})
          }else{
              res.render("views/Admin/ChangePassword", {message : "please check again your input" ,username : req.user.name,link : req.user.linkImage})
          }
      }else{
            res.render("views/Admin/ChangePassword", {message : "Old password is not correct" ,username : req.user.name,link : req.user.linkImage})
      }
});
}



module.exports = exports;
