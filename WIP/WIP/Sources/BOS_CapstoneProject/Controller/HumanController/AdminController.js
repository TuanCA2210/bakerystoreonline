const Human = require('../../Model/Human')

var exports = [];

exports.getListAccount = function(req,res){
  Human.View()
  .then(function(user) {
    res.render("views/Admin/ManageHuman",{link:req.user.linkImage,username:req.user.name,result: user})
  });
  //
  //     Human.getListAccount(function(err, exists) {
  //     console.log(exists)
  // })

  // .exec(function(err, data){
  //           console.log(data);
  // })

}

exports.getPrintAccountSearch = function(req,res){
  var email = req.param('email');
  var role = parseInt(req.param('role'));
  Human.Search(email,role)
  .then(function(user) {
    res.render("views/Admin/ManageHuman",{link:"",username:"",result: user})
  });

}

exports.InsertStaff = function(req,res){

  var name = req.body.staff.name;
  var password= req.body.staff.password;
  var address = req.body.staff.address;
  var phone = req.body.staff.phone;
  var email = req.body.staff.email.toLowerCase();
  var note  = req.body.staff.note;
  var link = req.file.path;

  if(phone[0] != 0)
  {
    res.render("views/Admin/InsertStaff",{username : req.user.name,link : req.user.linkImage, message:"Format Phone Number is not correct . Please Input again!"});
  }else if (phone.length > 11 || phone.length< 10)
  {
    res.render("views/Admin/InsertStaff",{username : req.user.name,link : req.user.linkImage, message:"Phone Number is not correct . Please Input again!"});
  }else{
    Human.checkEmailAndPhone(email,phone)
    .then(function(user){
      console.log(user.length);
      if(user.length > 0 ){
        res.render("views/Admin/InsertStaff",{username : req.user.name,link : req.user.linkImage, message:"Phone Number or Email has been exist . Please Try again!"});
      }else(
        Human.Insert(name,password,address,phone,email,note,link)
        .then(function(user) {
          res.redirect("/Staff")
        })
      )
    })
  }
}

//print old information befor update
exports.InfoUpdateStaff = function(req,res){
  var o_id = req.param('id');
  var id = require('mongodb').ObjectID(o_id);
  Human.SearchByIdAndRole(id,2)
        .then(function(user){
          res.render("views/Admin/UpdateHuman", {result: user,message: "",username : req.user.name,link : req.user.linkImage});
})

}

exports.UpdateStaff = function(req,res){
  var o_id = req.body.staff.id;
  var id = require('mongodb').ObjectID(o_id);
  var file = req.file;
  var name= req.body.staff.name;
  var address= req.body.staff.address ;
  var password = req.body.staff.password ;
  var email = req.body.staff.email.toLowerCase();
  var phone = req.body.staff.phone;
  var note =  req.body.staff.note;



  if(phone[0] != 0)
  {
    Human.SearchByIdAndRole(id,2)
          .then(function(user){
            res.render("views/Admin/UpdateHuman", {result: user,message:"Format Phone Number is not correct . Please Input again!",username : req.user.name,link : req.user.linkImage});
  })
  }else if (phone.length > 11 || phone.length< 10)
  {
    Human.SearchByIdAndRole(id,2)
          .then(function(user){
            res.render("views/Admin/UpdateHuman", {result: user,message:"Phone Number is not correct . Please Input again!",username : req.user.name,link : req.user.linkImage});
  })
  }else{
    Human.checkEmailAndPhone(email,phone)
    .then(function(user){
      if(user.length > 1 ){
        Human.SearchByIdAndRole(id,2)
              .then(function(user){
                res.render("views/Admin/UpdateHuman", {result: user,message:"Phone Number or Email has been exist . Please Try again!",username : req.user.name,link : req.user.linkImage});
      })
      }else{
        if(!file)
        {
          Human.Update(id,name,phone,password,email,address,note,"")
          .then(function(user) {
            res.redirect("/HumanManage")
          })
        }else{
          Human.Update(id,name,phone,password,email,address,note,req.file.path)
          .then(function(user) {
            res.redirect("/HumanManage")
          })
        }
      }
    })
  }
}





  exports.BlockUser = function(req,res){
    var nameuser_o_id = req.param('id');
    var id = require('mongodb').ObjectID(nameuser_o_id);
    Human.Block(id)
          .then(function(user){
                res.redirect('/HumanManage');
          })
  }

  exports.UnBlockUser = function(req,res){
    var nameuser_o_id = req.param('id');
    var id = require('mongodb').ObjectID(nameuser_o_id);
    Human.unBlock(id)
          .then(function(user){
                res.redirect('/HumanManage');
          })
  }


  exports.ChangePassword = function(req,res){
    var old_password = req.body.staff.oldpassword;
    var new_password = req.body.staff.newpassword;
    var re_password = req.body.staff.repassword;
    var o_id = req.user._id;
    var id = require('mongodb').ObjectID(o_id);

    if(new_password != re_password)
    {
      res.render("views/Admin/ChangePassword", {message : "new password and repassword must be the same" ,username : req.user.name,link : req.user.linkImage})
    }else{
      if(new_password == req.user.password)
      {
        res.render("views/Admin/ChangePassword", {message : "new password and old password must be the different each" ,username : req.user.name,link : req.user.linkImage})

      }else{
        if(old_password != req.user.password)
        {
          res.render("views/Admin/ChangePassword", {message : "Old password is not correct" ,username : req.user.name,link : req.user.linkImage})

        }else{
          Human.changePassword(id,new_password)
          .then(function(user){
            res.render("views/Admin/ChangePassword", {message : "Change successful" ,username : req.user.name,link : req.user.linkImage})

          })
        }
      }
    }

  }

  exports.ForgotPassword = function(req,res){
  var email = req.body.account.email.toLowerCase();
      Human.Search(email,3)
  .then(function(user){
    console.log(user.length);
  if(user.length == 0){

      res.render("views/Admin/forgotPassword", {message: "Email not exist"});
  }else{
      Human.sendEmail(email,3)
    res.render('views/Admin/login',{message : "password has been sent to your email"});


  }
  })
  }

module.exports = exports;
