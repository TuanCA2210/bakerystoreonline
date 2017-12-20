const Human = require('../../Model/Human')

var exports = [];

exports.InfoUpdateStaff = function(req,res){
  var o_id = req.user._id;
  var id = require('mongodb').ObjectID(o_id);
  var id = require('mongodb').ObjectID(o_id);
  Human.SearchByIdAndRole(id,2)
  .then(function(user){
    res.render("views/Staff/UpdateInformation", {result: user,message: "",username : req.user.name,link : req.user.linkImage})
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
      res.render("views/Staff/UpdateInformation", {result: user,message:"Format Phone Number is not correct . Please Input again!",username : req.user.name,link : req.user.linkImage});
    })
  }else if (phone.length > 11 || phone.length< 10)
  {
    Human.SearchByIdAndRole(id,2)
    .then(function(user){
      res.render("views/Staff/UpdateInformation", {result: user,message:"Phone Number is not correct . Please Input again!",username : req.user.name,link : req.user.linkImage});
    })
  }else{
    Human.checkEmailAndPhone(email,phone)
    .then(function(user){
      if(user.length > 1 ){
        Human.SearchByIdAndRole(id,2)
        .then(function(user){
          res.render("views/Staff/UpdateInformation", {result: user,message:"Phone Number or Email has been exist . Please Try again!",username : req.user.name,link : req.user.linkImage});
        })
      }else{
        if(!file)
        {
          Human.Update(id,name,phone,password,email,address,note,"")
          .then(function(user) {
            Human.SearchByIdAndRole(id,2)
            .then(function(user){
              res.render("views/Staff/UpdateInformation", {result: user,message:"Update successful!",username : req.user.name,link : req.user.linkImage});
            })
          })
        }else{
          Human.Update(id,name,phone,password,email,address,note,req.file.path)
          .then(function(user) {
            Human.SearchByIdAndRole(id,2)
            .then(function(user){
              res.render("views/Staff/UpdateInformation", {result: user,message:"Update successful!",username : req.user.name,link : req.user.linkImage});
            })
          })
        }
      }
    })
  }
}


exports.ChangePassword = function(req,res){
  var old_password = req.body.staff.oldpassword;
  var new_password = req.body.staff.newpassword;
  var re_password = req.body.staff.repassword;
  var o_id = req.user._id;
  var id = require('mongodb').ObjectID(o_id);

  if(new_password != re_password)
  {
    res.render("views/Staff/ChangePassword", {message : "new password and repassword must be the same" ,username : req.user.name,link : req.user.linkImage})
  }else{
    if(new_password == req.user.password)
    {
      res.render("views/Staff/ChangePassword", {message : "new password and old password must be the different each" ,username : req.user.name,link : req.user.linkImage})

    }else{
      if(old_password != req.user.password)
      {
        res.render("views/Staff/ChangePassword", {message : "Old password is not correct" ,username : req.user.name,link : req.user.linkImage})

      }else{
        Human.changePassword(id,new_password)
        .then(function(user){
          res.render("views/Staff/ChangePassword", {message : "Change successful" ,username : req.user.name,link : req.user.linkImage})

        })
      }
    }
  }

}

exports.ForgotPassword = function(req,res){
var email = req.body.account.email.toLowerCase();
    Human.Search(email,2)
.then(function(user){
if(user.length == 0  ){
    console.log("Not found");
    res.render("views/Staff/forgotPassword", {message: "Email not exist"});
}else{
console.log("found");
    Human.sendEmail(email,2)

  res.render('views/Staff/login',{message : "password has been sent to your email"});


}
})
}
module.exports = exports;
