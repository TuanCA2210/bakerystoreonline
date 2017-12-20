//1.require mongoose
const mongoose = require('mongoose')


//3.tao schema
const Schema = mongoose.Schema;

var CakeTypeSchema = new Schema({
  cake_type : {
    type : String,
    require: true
  },
  blocked :{
    type : Boolean,
    require : true
}


}, {collection :'CakeType'});


var Category = mongoose.model('CakeType', CakeTypeSchema);

function View() {
  return Category
  .find()
  .then(function(category) {
    return category;
  })
  .catch(function(err) {
    return err;
  });
}


function ViewUser() {
  return Category
  .find({blocked : false})
  .then(function(category) {
    return category;
  })
  .catch(function(err) {
    return err;
  });
}

function ViewNotLock() {
  return Category
  .find({blocked : false})
  .then(function(category) {
    return category;
  })
  .catch(function(err) {
    return err;
  });
}



function Insert(name) {
  return Category
  .create({
    cake_type : name,
    blocked : false
  })
  .then(function(category) {
    return category;
    console.log(category);
  })
  .catch(function(err) {
    retun(err);
  });
}


function Lock(id){
    return   Category.updateOne({_id : id},{blocked : true})
    .then(function(category) {
      return category;
      console.log(category);
    })
    .catch(function(err) {
      retun(err);
    });
}


function unLock(id){
    return   Category.updateOne({_id : id},{blocked : false})
    .then(function(category) {
      return category;
      console.log(category);
    })
    .catch(function(err) {
      retun(err);
    });
}

module.exports = {
    View : View,
    ViewNotLock : ViewNotLock,
    Insert : Insert,
    Lock : Lock,
    unLock : unLock,
ViewUser : ViewUser
}
