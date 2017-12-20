const Cake = require('../../Model/Cake')
const Category = require('../../Model/Category')
var exports = [];


exports.InsertCake =  function(req,res){
  Category.View()
  .then(function(category){
    res.render("views/Admin/InsertCake", {resultCakeCategory : category,message : "",username : req.user.name,link : req.user.linkImage});

  })
};


exports.UploadCake = function(req,res){
  var cake_name = req.body.cake.name.toUpperCase();
  var cake_categogy = req.body.cake.categogy;
  var cake_material = req.body.cake.material;
  var cake_size = req.body.cake.size;
  var cake_price = req.body.cake.price;
  var cake_quantity = req.body.cake.quantity;
  var cake_description = req.body.cake.description;
  var cake_link = req.file.path;

console.log(cake_categogy);
  if(cake_price > 0 && cake_quantity > 0){
    Cake.Insert(cake_categogy,cake_name,cake_material,cake_size,cake_quantity,cake_price,cake_description,cake_link)
    .then(function(cake){
      res.redirect("/InsertCake");

    })
  }else{
    Category.View()
    .then(function(category){
      res.render("views/Admin/InsertCake", {resultCakeCategory : resultCakeCategory, message :"Check quantity and price again",username : req.user.name,link : req.user.linkImage});

    })

  }

};



exports.CakeManage = function (req, res){
  Category.View()
  .then(function(category){
    Cake.View()
    .then(function(cake){
      res.render("views/Admin/ManageCake", {result : cake,resultCakeCategory:category,username : req.user.name,link : req.user.linkImage});
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
      res.render("views/Admin/ManageCake", {result : cake,resultCakeCategory:category,username : req.user.name,link : req.user.linkImage});
    })
  })
};




exports.CakeSell = function(req,res){
  var namecake_o_id = req.param('id');
  var id = require('mongodb').ObjectID(namecake_o_id);

  Cake.unLock(id)
  .then(function(cake){
    res.redirect("/CakeManage");
  })

};


exports.NotCakeSell = function(req,res){
  var namecake_o_id = req.param('id');
  var id = require('mongodb').ObjectID(namecake_o_id);

  Cake.Lock(id)
  .then(function(cake){
    res.redirect("/CakeManage");
  })
};


//Update cake
exports.InfoUpdateCake = function(req,res){
  var o_id = req.param('id');
  var id = require('mongodb').ObjectID(o_id);
  Cake.SearchById(id)
  .then(function(cake){
    res.render("views/Admin/UpdateCake", {result: cake, message :"",username : req.user.name,link : req.user.linkImage});

  })
};


exports.UpdateCake = function(req,res){
  var o_id = req.body.cake.id;
  var id = require('mongodb').ObjectID(o_id);
  var file = req.file;
  var price = req.body.cake.price ;
  var quantity = req.body.cake.quantity ;
  var name_cake= req.body.cake.name.toUpperCase();
  var description= req.body.cake.description ;
  var name_size = req.body.cake.size ;


  if(price > 0 && quantity >  0){
    if(!file){
      Cake.Update(id,name_cake,name_size,quantity,price,description,"")
      .then(function(cake){
        res.redirect("/CakeManage")
      })
    }else{
      Cake.Update(id,name_cake,name_size,quantity,price,description,req.file.path)
      .then(function(cake){
        res.redirect("/CakeManage")
      })
    }

  }else{
    Cake.SearchById(id)
    .then(function(cake){
      res.render("views/Admin/UpdateCake", {result: cake, message :"Quantity or Price must be larger than 0 ",username : req.user.name,link : req.user.linkImage});
    })
  }
};
module.exports = exports;
