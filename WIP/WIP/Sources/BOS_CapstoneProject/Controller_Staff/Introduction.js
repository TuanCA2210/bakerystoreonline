const mongoose = require('mongoose')
const introductionModel = require('../Schema/IntroductionSchema');

var express = require("express");
const config = require('../config.json')
var url = config.connectionString;
var app = express();
var exports = {};

exports.InsertIntroduction = function(req,res){
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection('Introduction').find().toArray(function(err,result){
      if(result.length == 0 ){
        introductionModel.create({
          address: req.body.introduction.address,
          phone: req.body.introduction.phone,
          email:req.body.introduction.email,
          linkImage : req.file.path,
          date_update : new Date()
        })
        res.render("views/Staff/CreateIntroduction",{message : "Da Tao Thanh cong",username : req.user.name,link : req.user.linkImage})
      }else{
        res.render("views/Staff/CreateIntroduction",{message : "Da Ton tai",username : req.user.name,link : req.user.linkImage})
      }

    })
  })
}

exports.PreUpdateIntroduction = function(req,res){
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection('Introduction').find().toArray(function(err,result){

      res.render("views/Staff/UpdateIntroduction",{result : result,username : req.user.name,link : req.user.linkImage})


    })
  })
}


exports.UpdateIntroduction = function(req,res){
  var o_id = req.body.introduction.id;

  var id = require('mongodb').ObjectID(o_id);
  var file = req.file;
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var myquery = { _id : id };
  console.log(file);
  if(!file){
    var newvalues = {
      address: req.body.introduction.address,
      phone: req.body.introduction.phone,
      email:req.body.introduction.email,
      date_update : new Date()
      // linkImage :  req.file.path,
      };
    db.collection("Introduction").updateOne(myquery, {$set :newvalues}, function(err, result) {
      db.close();
    });
  }else{
    var newvaluesImg = {
      address: req.body.introduction.address,
      phone: req.body.introduction.phone,
      email:req.body.introduction.email,
      linkImage : req.file.path,
      date_update : new Date()
      };
    db.collection("Introduction").updateOne(myquery, {$set :newvaluesImg}, function(err, result) {
      db.close();
    });
  }


  db.collection("Introduction").find().toArray(function(err, result) {
  res.render("views/Staff/Updateintroduction", {result : result,username : req.user.name,link : req.user.linkImage})
  db.close();
});
});
};


module.exports = exports;
