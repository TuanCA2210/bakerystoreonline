const Cake = require('../Model/Cake')
const Category = require('../Model/Category')
const Blog = require('../Model/Blog')
const Event = require('../Model/Event')
const Human = require('../Model/Human')
const Introduction = require('../Model/Introduction')

var exports = [];




//HomeCakes
exports.HomeCakes =  function (req, res){
  Event.ViewUser()
  .then(function(event_all){
  Category.ViewUser()
  .then(function(category){
    Introduction.View()
      .then(function(introduction){
    Cake.ViewUser()
    .then(function(cake){
      res.render("views/User/HomeCakes", {Introduction : introduction[0], resultEvent : event_all, resultCategory: category, result : cake});
    })
  })
  })
})
};

//Cupcakes
exports.Cupcakes =  function (req, res){
  var o_id = req.param('id');
  var id = require('mongodb').ObjectID(o_id);
  Event.ViewUser()
  .then(function(event_all){
  Category.ViewUser()
  .then(function(category){
    Introduction.View()
      .then(function(introduction){
    Cake.Search(id,"")
    .then(function(cake){
      res.render("views/User/Cupcakes", {Introduction : introduction[0], resultEvent : event_all, resultCategory: category, result : cake});
    })
    })
    })
  })
};

//DetailCake
exports.DetailCake =  function (req, res){
  var o_id = req.param('id');
  var id = require('mongodb').ObjectID(o_id);
  Category.ViewUser()
  .then(function(category){
    Introduction.View()
      .then(function(introduction){
    Cake.SearchById(id)
    .then(function(cake){
      res.render("views/User/DetailCake", {Introduction : introduction[0], result : cake, resultCategory: category});
    })
    })
  })
};

//event
exports.Event =  function (req, res){
  var o_id = req.param('id');
  var id = require('mongodb').ObjectID(o_id);
  Category.ViewUser()
  .then(function(category){
    Introduction.View()
      .then(function(introduction){
    Event.SearchById(id,"")
    .then(function(event_all){
      res.render("views/User/Event", {Introduction : introduction[0], resultEvent : event_all, resultCategory: category});
    })
    })
  })
};

//Blog
exports.Blog =  function (req, res){
  var o_id = req.param('id');
  var id = require('mongodb').ObjectID(o_id);
  Category.ViewUser()
  .then(function(category){
    Introduction.View()
      .then(function(introduction){
    Blog.ViewUser()
    .then(function(blog){
      res.render("views/User/Blog", {Introduction : introduction[0], result : blog, resultCategory: category});
    })
    })
  })
};

//BlogDetail
exports.BlogDetail =  function (req, res){
  var o_id = req.param('id');
  var id = require('mongodb').ObjectID(o_id);
  Category.ViewUser()
  .then(function(category){
    Introduction.View()
      .then(function(introduction){
    Blog.blogDetail(id)
    .then(function(blog){
      res.render('views/User/BlogDetail',{Introduction : introduction[0], result : blog, resultCategory : category});
    })
    })
  })
};

//Profile
exports.Profile =  function (req, res){
  var o_id = req.user._id;
  var id = require('mongodb').ObjectID(o_id);
  // var id = require('mongodb').ObjectID(o_id);
  var MongoClient = require('mongodb').MongoClient;
  console.log(o_id);
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;

    db.collection("Human").find({_id : id}).toArray(function(err, user) {
      db.collection("Bill").find({name_id : id}).toArray(function(err, bill) {
        res.render("views/User/Profile", { user: user, bill : bill,resultCategory : "", message :""});

        db.close();
      });


    });
  });
};

//Contact
exports.Contact =  function (req, res){
  Category.ViewUser()
  .then(function(category){
    Introduction.View()
      .then(function(introduction){
        console.log(introduction);
      res.render("views/User/Contact", {Introduction : introduction[0], resultCategory: category});
    })
  })
};

//About
exports.About =  function (req, res){
  Category.ViewUser()
  .then(function(category){
    Introduction.View()
      .then(function(introduction){
      res.render("views/User/About", {Introduction : introduction[0], resultCategory: category});
  })
  })
};


//Cart
exports.Cart =  function (req, res){
  Category.ViewUser()
  .then(function(category){
    Introduction.View()
      .then(function(introduction){
  var temp = req.body.cart.i ;
  var name_cake = req.body.cart.name_cake;

  var price = req.body.cart.price;
  var quantity = req.body.cart.quantity;
  var description = req.body.cart.description;
  var link_image = req.body.cart.link_image;

  var cart = [];

  if(temp > 1 )
{
  for(var i = 0 ; i < name_cake.length ; i++)
  {
    cart.push({"image":link_image[i], "cake":name_cake[i], "description": description[i], "price" : price[i] , "quantity" : quantity[i]  });
  }
}else{
  cart.push({"image":link_image, "cake":name_cake, "description": description, "price" : price , "quantity" : quantity  });
}
  console.log(cart)
  res.render("views/User/Cart", {Introduction : introduction[0], cart : cart, resultCategory : category});
});
});
};


//Checkout
exports.CheckOut = function(req,res){
  var cake = req.body.checkout.cake;
  var price = req.body.checkout.price;
  var quantity = req.body.checkout.quantity;
  var phone = req.body.checkout.phone;
  var name = req.body.checkout.name;
  var email = req.body.checkout.email;
  var address = req.body.checkout.address;
  var value =[] ;
  for(var i = 0 ;i <cake.length;i++)
  {
    value.push({"cake_name":cake[i], "price" : price[i] , "quantity" : quantity[i]  });
  }
  var MongoClient = require('mongodb').MongoClient;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection("Human").find({email : email.toLowerCase()}).toArray(function(err, result) {
      console.log(result.length);
      if(result.length > 0){
        var id = require('mongodb').ObjectID(result[0]._id);

        BillModel.create({
          name_id: id,
          name : name,
          phone:phone,
          address : address,
          email:email,
          confirm : false,
          time : new Date(),
          cake : value
        })
        res.redirect("/HomeCakes");
      }else{
        console.log("am here");
        BillModel.create({

          name : name,
          phone:phone,
          address : address,
          email:email,
          confirm : false,
          time : new Date(),
          cake : value
        })
        res.redirect("/HomeCakes");
      }
      db.close();
    })
  })
}



//Update Information User
exports.UpdateUser = function(req,res){
  var o_id = req.body.user.id;
  var id = require('mongodb').ObjectID(o_id);
  var file = req.file;
  console.log(file);
  var MongoClient = require('mongodb').MongoClient
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var myquery = { _id : id };

    var email = req.body.user.email;
    var phone = req.body.user.phone;
    console.log(email);
    db.collection("Human").find({
      $or: [
        {email: email.toLowerCase()}, {phone:phone}
      ]}).toArray(function(err,result){
        if(result.length <=1 ){
          if(!file){
            console.log("khong co img");
            var newvalues = {
              name: req.body.user.name,
              address: req.body.user.address ,
              phone : phone,
              email : email.toLowerCase() ,
              date_update : new Date()  };
              db.collection("Human").updateOne(myquery, {$set :newvalues}, function(err, result) {
                db.close();
              });
              res.redirect("/Profile");
            }else{
              console.log("cos img");
              var newvalues = {
                name: req.body.user.name,
                address: req.body.user.address ,
                phone : phone,
                email : email.toLowerCase() ,
                note :  req.body.user.note,
                linkImage : req.file.path,
                date_update : new Date()  };
                db.collection("Human").updateOne(myquery, {$set :newvalues}, function(err, result) {
                  db.close();
                });
                res.redirect("/Profile")
              }
            }else{
              db.collection("Human").find({ _id: id , role : 1}).toArray(function(err, user) {
                if(result.length > 0 ){
                  res.render("views/User/Profile", {user: user,message:"Phone or Email has been exist",username : req.user.name,link : req.user.linkImage,resultCategory:""});
                  db.close();
                }
              });
            }

          })

        });
      }


      //sign up
      exports.signup = function(req,res){
        var email = req.body.user.email;
        var password = req.body.user.password;
        var re_password = req.body.user.re_password;
        console.log(res.status(200).end);
        var MongoClient = require('mongodb').MongoClient;
        MongoClient.connect(url, function(err, db) {
          if (err) throw err
          if(password == re_password){
            db.collection("Human").find({email : email}).toArray(function(err, result) {
              if(result.length==0){
                humanModel.create({
                  name : req.body.user.name,
                  phone : "",
                  password: password,
                  email : req.body.user.email,
                  address : "",
                  role : 1,
                  note : "",
                  date_create: new Date(),
                  date_update: new Date(),
                  black_list : false
                });

              res.render("views/User/login",{message: "Signup success"});;
            }else{
              res.render("views/User/login",{message : "Email has been exist .Please try again !"});
            }
            db.close();
          });
          }else{
            res.render("views/User/login",{message : "Password and repeat password must be the same !!"});
          }
        })

    }


    module.exports = exports;
