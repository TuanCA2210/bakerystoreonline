//1.require mongoose
const mongoose = require('mongoose')


//3.tao schema
const Schema = mongoose.Schema;

var IntroductionSchema = new Schema({
  address :{
    type : String,
    require:true
  },
  phone:{
    type : String,
    require : true
  },
  email:{
    type:String,
    require : true
  },
  linkImage:{
    type:String,
    require : true
  },
  date_update:{
    type : Date,
    require: true
  },
  status:{
    type: Boolean,
  require:true
},
staff_ids:{
  type: Schema.Types.ObjectId,
  ref: 'Introduction'
},
staff_name:{
  type:String,
require:true
}

}, {collection :'Introduction'});


var Introduction = mongoose.model('Introduction', IntroductionSchema);



function View() {
  return Introduction
  .find({status : false})
  .then(function(introduction) {
    return introduction;
  })
  .catch(function(err) {
    return err;
  });
}


function Search(id){
  return Introduction.findOne({_id:id})
  .then(function(introduction) {
    return introduction;
  })
  .catch(function(err) {
    return err;
  });
}

function Update(id,address,phone,email,link,staff_ids,staff_name) {

    return Introduction.updateOne({_id : id},{
      address: address,
      phone: phone,
      email:email,
      linkImage : link,
      date_update : new Date(),
      staff_ids:staff_ids,
      staff_name:staff_name
      })
      .then(function(introduction) {
        return introduction;
        console.log(introduction);
      })
      .catch(function(err) {
        retun(err);
      });

}


function Insert(address,phone,email,link,staff_ids,staff_name) {
  return Introduction
  .create({
    address: address,
    phone: phone,
    email:email,
    linkImage : link,
    date_update : new Date(),
    status:false,
    staff_ids:staff_ids,
    staff_name:staff_name
  })
  .then(function(introduction) {
    return introduction;

  })
  .catch(function(err) {
    console.log(err);
    retun(err);
  });
}


function Lock(id,staff_ids,stafF_name){
    return   Introduction.updateOne({_id : id},{status : true,staff_ids:staff_ids,staff_name:stafF_name,date_update : new Date()})
    .then(function(introduction) {
      return introduction;

    })
    .catch(function(err) {
      retun(err);
    });
}


function unLock(id){
  return   Introduction.updateOne({_id : id},{status : false,staff_ids:staff_ids,staff_name:stafF_name,date_update : new Date()})
    .then(function(introduction) {
      return introduction;

    })
    .catch(function(err) {
      retun(err);
    });
}

module.exports = {
  View : View,
  Search: Search,
  Insert:Insert,
  Update : Update,
  Lock : Lock,
  unLock : unLock,
};
