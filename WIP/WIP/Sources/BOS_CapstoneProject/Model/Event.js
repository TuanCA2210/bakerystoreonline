//1.require mongoose
const mongoose = require('mongoose')


//3.tao schema
const Schema = mongoose.Schema;

var EventSchema = new Schema({
  title :{
    type : String,
    require:true
  },
  content:{
    type : String,
    require : true
  },
  link:{
    type:String
  },
  date_create:{
    type : Date,
    require: true
  },
  lock:{
    type : Boolean,
    require :true
  }

}, {collection :'Event'});



var Event = mongoose.model('Event', EventSchema);

function View() {
  return Event
  .find().sort( { date_create: -1 } )
  .then(function(event_all) {
    return event_all;
  })
  .catch(function(err) {
    return err;
  });
}

function ViewUser() {
  return Event
  .find({lock : false}).sort( { date_create: -1 } )
  .then(function(event_all) {
    return event_all;
  })
  .catch(function(err) {
    return err;
  });
}

function SearchById(id , title) {

  if(id != ""  && title=="" ){
    return Event
    .find({_id: id})
    .then(function(event_all) {
      return event_all;
    })
    .catch(function(err) {
      retun(err);
    });
  }else if(id == ""  && title !=""){
    return Event
    .find({title : new RegExp(title)})
    .then(function(event_all) {
      return event_all;
    })
    .catch(function(err) {
      retun(err);
    });
  }else if(id != ""  && title !=""){
    return Event
    .find({title : new RegExp(title), _id : id})
    .then(function(event_all) {
      return event_all;
    })
    .catch(function(err) {
      retun(err);
    });
  }else{
    return Event
    .find({title : new RegExp(title), _id : id})
    .then(function(event_all) {
      return event_all;
    })
    .catch(function(err) {
      retun(err);
    });
  }
}

function Search(title) {

  return Event
  .find({title:new RegExp(title)}).sort( { date_create: -1} )
  .then(function(event_all) {
    return event_all
  })
  .catch(function(err) {
    return(err);
  });

}

//
//


//


function Insert(title,content,link) {
  console.log(title);
  console.log(content);
  console.log(link);
  return Event.create({
    title : title,
    content : content,
    link : link,
    date_create: new Date(),
    lock : false
  })
  .then(function(event_all) {
    return event_all;
  })
  .catch(function(err) {
    return(err);
  });
}



function Lock(id){
  return   Event.updateOne({_id : id},{lock : true})
  .then(function(caevent_allke) {
    return event_all;
  })
  .catch(function(err) {
    return(err);
  });
}


function unLock(id){
  return   Event.updateOne({_id : id},{lock : false})
  .then(function(event_all) {
    return event_all;
    console.log(event_all);
  })
  .catch(function(err) {
    return(err);
  });
}
module.exports = {
  View : View,
  Search : Search,
  Insert:Insert,
  Lock : Lock,
  unLock : unLock,
ViewUser : ViewUser,
SearchById : SearchById
}
