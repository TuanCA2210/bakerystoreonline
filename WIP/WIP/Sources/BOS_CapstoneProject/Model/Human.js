//1.require mongoose
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird');
mongoose.Promise = global.Promise;
const q = require('q');
const nodemailer = require('nodemailer');

var randomstring = require("randomstring");

//3.tao schema
const Schema = mongoose.Schema;

var HumanSchema = new Schema({
  name :{
    type : String,
    require:true
  },
  phone :{
    type : String ,
    require: true
  },
  password :{
    type : String,
    require: true
  },
  email :{
    type : String ,
    require: true
  },
  address :{
    type : String,
    require : true
  },
  role :{
    type : Number ,
    require :true
  },
  note : {
    type : String
  },
  linkImage: {
    type : String
  },
  date_create :{
    type : Date,
    require: true
  },
  date_update :{
    type : Date,
    require: true
  },
  black_list :{
    type : Boolean,
    require: true
  }

}, {collection :'Human'});

var Human = mongoose.model('Human', HumanSchema);
// var exports = [];
var Promise = require('rsvp').Promise;


function View() {
  return Human
  .find({ role: { $lt: 3 } })
  .then(function(user) {
    return user;
  })
  .catch(function(err) {
    return err;
  });
}


function Search(email,role) {
  if(role > 0  && email =="" ){
    return Human
    .find({role: role})
    .then(function(user) {
      return user;
    })
    .catch(function(err) {
      retun(err);
    });
  }else if(role == 0 && email != ""){
    return Human
    .find({email:new RegExp(email),role: { $lt: 3 }})
    .then(function(user) {
      return user;
    })
    .catch(function(err) {
      retun(err);
    });
  }else if( role > 0 && email != ""  ){
    return Human
    .find({email:new RegExp(email),role: role})
    .then(function(user) {
      return user;
    })
    .catch(function(err) {
      retun(err);
    });
  }else{
    return Human
    .find({email:new RegExp(email),role: role})
    .then(function(user) {
      return user;
    })
    .catch(function(err) {
      retun(err);
    });
  }
}



function SearchByIdAndRole(id,role){
  return Human.findOne({_id:id ,role : role})
  .then(function(user) {
    console.log(user);
    return user;
  })
  .catch(function(err) {
    console.log(err);
    return err;
  });
}

function SearchById(id){
  return Human.findOne({_id:id})
  .then(function(user) {
    console.log(user);
    return user;
  })
  .catch(function(err) {
    console.log(err);
    return err;
  });
}

function Update(id,name,phone,password,email,address,note,link) {
  if(link != ""){

  return Human.updateOne({_id : id},{
      name : name,
      phone : phone,
      password: password,
      email : email,
      address : address,
      note : note,
      linkImage: link,
      date_update: new Date()
    })
    .then(function(user) {
      return user;
      console.log(user);
    })
    .catch(function(err) {
      retun(err);
    });
  }else{

    return Human.updateOne({_id : id},{
        name : name,
        phone : phone,
        password: password,
        email : email,
        address : address,
        note : note,
        date_update: new Date()
      })
      .then(function(user) {
        return user;
        console.log(user);
      })
      .catch(function(err) {
        retun(err);
      });
  }
}


function Insert(name,password,address,phone,email,note,link) {
  return Human
  .create({
    name : name,
    phone : phone,
    password: password,
    email : email,
    address : address,
    role :2,
    note : note,
    linkImage: link,
    date_create: new Date(),
    date_update: new Date(),
    black_list : false
  })
  .then(function(user) {
    return user;
    console.log(user);
  })
  .catch(function(err) {
    retun(err);
  });
}
function checkEmailAndPhone(email,phone){
  return Human
  .find({
  $or: [
	     {email: email}, {phone:phone}
      ]})
  .then(function(user) {
    return user;
  })
  .catch(function(err) {
    return err;
  });
}


function Block(id){
    return   Human.updateOne({_id : id},{black_list : true,date_update : new Date()})
    .then(function(user) {
      return user;
      console.log(user);
    })
    .catch(function(err) {
      retun(err);
    });
}


function unBlock(id){
    return   Human.updateOne({_id : id},{black_list : false,date_update : new Date()})
    .then(function(user) {
      return user;
      console.log(user);
    })
    .catch(function(err) {
      retun(err);
    });
}

function changePassword(id,password){
  return   Human.updateOne({_id : id},{password: password ,date_update : new Date()})
  .then(function(user) {
    return user;
    console.log(user);
  })
  .catch(function(err) {
    retun(err);
  });
}

function sendEmail(email,role){

      var newpassword = randomstring.generate({
        length: 12,
        charset: 'alphanumeric'
      });
      console.log(newpassword);
      Human.update({email : email},{password : newpassword})
.then(function(){
    nodemailer.createTestAccount((err, account) => {

          // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport('smtps://hoibanbanh%40gmail.com:123321AA@smtp.gmail.com');

          // setup email data with unicode symbols
          let mailOptions = {
              from: '"HoiBanBanh 👻" <foo@blurdybloop.com>', // sender address
              to: email, // list of receivers
              subject: 'Reset Password ✔', // Subject line
              text: 'Reset Password', // plain text body
              html: '<p>Dear Sir/Madam </p></br><b>This is your new Password : '+newpassword +'  </b>' // html body
          };

          // send mail with defined transport object
          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  return console.log(error);
              }
              console.log('Message sent: %s', info.messageId);
              // Preview only available when sending through an Ethereal account
              console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

              // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
              // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
          });
      });
})
    }



module.exports = {
  View : View,
  Search: Search,
  Insert:Insert,
  Update : Update,
  checkEmailAndPhone : checkEmailAndPhone,
  SearchByIdAndRole : SearchByIdAndRole,
  Block : Block,
  unBlock : unBlock,
changePassword:changePassword,
sendEmail: sendEmail

};
