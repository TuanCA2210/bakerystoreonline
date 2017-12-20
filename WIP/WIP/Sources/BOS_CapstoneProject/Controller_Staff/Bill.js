const mongoose = require('mongoose')
const BillModel = require('../../Schema/BillSchema');

var express = require("express");
const config = require('../config.json')
var url = config.connectionString;
var app = express();
var exports = {};

exports.Bill = function(req,res){
  var date= new Date();
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection('Bill').find({
    time : {"$lt": date}
    }).toArray(function(err, result) {
    res.render("views/Staff/Bill",{result:result,username : req.user.name,link : req.user.linkImage})
    })
    db.close();
});
};


exports.BillSearch = function(req,res){
  var search = req.param('datebill');
  var date = new Date(search);
  var today_search = new Date(date);
  var tomorrow_search = new Date(date.setDate(date.getDate()+1));
  console.log(today_search);
  console.log(tomorrow_search);
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection('Bill').find({
    time : {"$gte": today_search, "$lt" : tomorrow_search}
    }).toArray(function(err, result) {
    res.render("views/Staff/Bill",{result:result,username : req.user.name,link : req.user.linkImage})
    })
    db.close();
});
}





exports.ConfirmBill = function(req,res){
  var o_id = req.param('id');
  var id = require('mongodb').ObjectID(o_id);
  var date= new Date();
  console.log(id);
BillModel.update({_id : id},{confirm : true}).exec((err,result)=>{console.log(result)});
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection('Bill').find({
    time : {"$lt": date}
    }).toArray(function(err, result) {
    res.render("views/Staff/Bill",{result:result,username : req.user.name,link : req.user.linkImage})
    })
    db.close();
});
}


exports.UnConfirmBill = function(req,res){
  var o_id = req.param('id');
  var id = require('mongodb').ObjectID(o_id);
  var date= new Date();
  console.log(id);
BillModel.update({_id : id},{confirm : false}).exec((err,result)=>{console.log(result)});
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection('Bill').find({
    time : {"$lt": date}
    }).toArray(function(err, result) {
    res.render("views/Staff/Bill",{result:result,username : req.user.name,link : req.user.linkImage})
    })
    db.close();
});
}


module.exports = exports;
