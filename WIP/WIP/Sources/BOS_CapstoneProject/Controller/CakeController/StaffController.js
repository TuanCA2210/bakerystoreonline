const Cake = require('../../Model/Cake')
const Category = require('../../Model/Category')
var exports = [];







exports.CakeManage = function (req, res){
  Category.View()
  .then(function(category){
    Cake.View()
    .then(function(cake){
      res.render("views/Staff/ManageCake", {result : cake,resultCakeCategory:category,username : req.user.name,link : req.user.linkImage});
    })
  })

};


exports.PrintCakeSearch = function (req, res){
  //get value from textbox search
  var cake = req.param('cake').toUpperCase();
  var cake_type_id = req.param('catyegory');
  var id  ="";

  if(cake_type_id != "")
  {
    id =require('mongodb').ObjectID(cake_type_id);
    console.log("#null");
  }
  Category.View()
  .then(function(category){
    Cake.Search(id,cake)
    .then(function(cake){
      res.render("views/Staff/ManageCake", {result : cake,resultCakeCategory:category,username : req.user.name,link : req.user.linkImage});
    })
  })
};



module.exports = exports;
