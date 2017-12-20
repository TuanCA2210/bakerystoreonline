const mongoose = require('mongoose')
const Introduction = require('../Model/Introduction');

var express = require("express");
const config = require('../config.json')
var url = config.connectionString;
var app = express();
var exports = {};

exports.InsertIntroduction = function(req,res){

  var address = req.body.introduction.address;
  var phone = req.body.introduction.phone;
  var email = req.body.introduction.email;
  var linkImage = req.body.introduction.link;


  Introduction.View()
  .then(function(introduction){
    if(introduction.length==0){
      Introduction.Insert(address,phone,email,linkImage,req.user._id,req.user.email)
      .then(function(introduction){
        res.render("views/Staff/CreateIntroduction",{message : "",username : req.user.name,link : req.user.linkImage})

      })
    }else{
      res.render("views/Staff/CreateIntroduction",{message : "Can Not Add",username : req.user.name,link : req.user.linkImage})

    }

  })
}

exports.PreUpdateIntroduction = function(req,res){
  Introduction.View()
  .then(function(introduction){
    if(introduction.length>0){
      console.log(introduction);
      console.log(introduction[0]._id);
      console.log(introduction[0].linkImage);
      res.render("views/Staff/UpdateIntroduction",{result : introduction,username : req.user.name,link : req.user.linkImage})

    }else{
      res.render("views/Staff/CreateIntroduction",{message : "",username : req.user.name,link : req.user.linkImage})

    }
  })
}


exports.UpdateIntroduction = function(req,res){
  var o_id = req.body.introduction.id;
  console.log(req.body.introduction.id);
  var id = require('mongodb').ObjectID(o_id);
  var link = req.body.introduction.link;
  var address = req.body.introduction.address;
  var phone = req.body.introduction.phone;
  var email = req.body.introduction.email;



    Introduction.Update(id,address,phone,email,link,req.user._id,req.user.email)
    .then(function(introduction){
      Introduction.View()
      .then(function(introduction){
        res.render("views/Staff/Updateintroduction", {result : introduction,username : req.user.name,link : req.user.linkImage})
      })
    })


};


module.exports = exports;
