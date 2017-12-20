const Human = require('../Model/Human')
var LocalStrategy   = require('passport-local').Strategy;
const config = require('../config.json')
var url = config.connectionString;

module.exports = function(passport){
  //day email vao cookie
  passport.serializeUser(function(user, done) {
       done(null, user.email);
   });
  //check email with session
   passport.deserializeUser(function(email, done) {
       var MongoClient = require('mongodb').MongoClient;
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
            db.collection("Human").findOne({email:email.toLowerCase()  },function(err, user) {

          if(user){
             return done(null, user);
  }else{
         return done(null,false);
  }
      });
  });
})
   passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
        console.log(email.toLowerCase());
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        var MongoClient = require('mongodb').MongoClient;
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
          db.collection("Human").findOne({email:email.toLowerCase()},function(err, admin) {
            // if there are any errors, return the error before anything else


                console.log(admin.length)
                console.log("--------------");
            // if no user is found, return the message
             if (!admin)
             {
                 console.log("log in false 1 ");
                 return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

             }else if(admin.password == password && admin.role == 3)
             {
                 console.log("Hi HIhi");
                 return done(null, admin);

             }else{
                 console.log("log in false 2");
                 return done(null,false,req.flash('loginMessage','Password wrong'));
               }

        });
})
    }));
    passport.use('local-loginStaff', new LocalStrategy({
         // by default, local strategy uses username and password, we will override with email
         usernameField : 'email',
         passwordField : 'password',
         passReqToCallback : true // allows us to pass back the entire request to the callback
     },
     function(req, email, password, done) { // callback with email and password from our form

         // find a user whose email is the same as the forms email
         // we are checking to see if the user trying to login already exists
         var MongoClient = require('mongodb').MongoClient;
       MongoClient.connect(url, function(err, db) {
         if (err) throw err;
         db.collection("Human").findOne({email:email.toLowerCase()},function(err, user) {
             // if there are any errors, return the error before anything else
             console.log("Da den lay du lieu")
console.log(user);
            console.log(email);
            console.log(password);
             if (err)
                 return done(err);

             // if no user is found, return the message
              if (!user)
              {
                  console.log("Null ");
                  return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

              }else if(user.password == password && user.role == 2 && user.black_list == false)
              {
  console.log(user.password);
console.log(password);
                  console.log("Not NUl");
                  return done(null, user);

              }else if(user.role == 2 && user.black_list == false && user.password != password){
                  console.log("log in false 2");
                  return done(null,false,req.flash('loginMessage','Password wrong'));
                }else if(user.role == 2 && user.black_list == true && user.password == password){
                    return done(null,false,req.flash('loginMessage','Account had been blocked '));
                  }else if(user.role == 2 && user.black_list == true && user.password != password){
                      return done(null,false,req.flash('loginMessage','Please check your password or account had been blocked '));
                    }else{
                        return done(null,false,req.flash('loginMessage','Account not exists '));
              }

         });
})
     }));
     passport.use('local-loginUser', new LocalStrategy({
          // by default, local strategy uses username and password, we will override with email
          usernameField : 'email',
          passwordField : 'password',
          passReqToCallback : true // allows us to pass back the entire request to the callback
      },
      function(req, email, password, done) { // callback with email and password from our form

          // find a user whose email is the same as the forms email
          // we are checking to see if the user trying to login already exists
          var MongoClient = require('mongodb').MongoClient;
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          db.collection("Human").findOne({email:email.toLowerCase()},function(err, user) {
              // if there are any errors, return the error before anything else
              console.log("Da den lay du lieu")
             console.log(email);
             console.log(password);
              if (err)
                  return done(err);

              // if no user is found, return the message
               if (!user)
               {
                   console.log("log in false 1 ");
                   return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

               }else if(user[0].password == password && user[0].role == 1 && user[0].black_list == false)
               {
                   console.log("Hi HIhi");
                   return done(null, user);

               }else if(user[0].role == 1 && user[0].black_list == false && user[0].password != password){
                   console.log("log in false 2");
                   return done(null,false,req.flash('loginMessage','Password wrong'));
                 }else if(user[0].role == 1 && user[0].black_list == true && user[0].password == password){
                     return done(null,false,req.flash('loginMessage','Account had been blocked '));
                   }else if(user[0].role == 1 && user[0].black_list == true && user[0].password != password){
                       return done(null,false,req.flash('loginMessage','Please check your password or account had been blocked '));
                     }else{
                         return done(null,false,req.flash('loginMessage','Account not exists '));
               }

          });
})
      }));


}
