const mongoose = require('mongoose')
const cakeModel = require('../Schema/CakeSchema');

var express = require("express");
const config = require('../config.json')
var url = config.connectionString;
var app = express();
var exports = {};








exports.CakeManage = function (req, res){
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
db.collection("CakeType").find({blocked : false}).toArray(function(err, resultCakeCategory) {
    db.collection("Cake").find().toArray(function(err, result) {

      res.render("views/Staff/ManageCake", {result : result,resultCakeCategory:resultCakeCategory,username : req.user.name,link : req.user.linkImage});
      db.close();
  })
  });
    });
  };


  exports.PrintCakeSearch = function (req, res){
      //get value from textbox search
  var cake = req.param('cake');
  var cake_type_id = req.param('catyegory');
  var id ;
  if(cake_type_id != "")
  {
      id =require('mongodb').ObjectID(cake_type_id);
  }
  console.log(cake_type_id);
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    if(cake_type_id !=""  && cake =="" ){
      db.collection("CakeType").find({blocked : false}).toArray(function(err, resultCakeCategory) {
          db.collection("Cake").find({cake_type_ids : id}).toArray(function(err, result) {
            res.render("views/Staff/ManageCake", {result : result,resultCakeCategory:resultCakeCategory,username : req.user.name,link : req.user.linkImage});
            db.close();
        })
        });
    }else if(cake_type_id == "" && cake != ""){
      db.collection("CakeType").find({blocked : false}).toArray(function(err, resultCakeCategory) {
          db.collection("Cake").find({name_cake : new RegExp(cake)}).toArray(function(err, result) {
            res.render("views/Staff/ManageCake", {result : result,resultCakeCategory:resultCakeCategory,username : req.user.name,link : req.user.linkImage});
            db.close();
        })
        });
    }else if( cake_type_id != "" && cake != ""  ){
      db.collection("CakeType").find({blocked : false}).toArray(function(err, resultCakeCategory) {
          db.collection("Cake").find({name_cake : new RegExp(cake),cake_type_ids : id}).toArray(function(err, result) {
            res.render("views/Staff/ManageCake", {result : result,resultCakeCategory:resultCakeCategory,username : req.user.name,link : req.user.linkImage});
            db.close();
        })
        });
    }else{
      db.collection("CakeType").find({blocked : false}).toArray(function(err, resultCakeCategory) {
          db.collection("Cake").find({name_cake : new RegExp(cake),cake_type_ids : id}).toArray(function(err, result) {
            res.render("views/Staff/ManageCake", {result : result,resultCakeCategory:resultCakeCategory,username : req.user.name,link : req.user.linkImage});
            db.close();
        })
        });

    }
  });

  };










module.exports = exports;
