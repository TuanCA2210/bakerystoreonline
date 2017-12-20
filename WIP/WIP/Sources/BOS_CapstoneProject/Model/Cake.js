//1.require mongoose
const mongoose = require('mongoose')


//3.tao schema
var Schema = mongoose.Schema;

let CakeSchema = new Schema({
  cake_type_ids:{
    type: Schema.Types.ObjectId,
    ref: 'CakeType'
},
  name_cake :{
    type : String,
    require:true
  },
  material :
  [String],
name_size : {
  type: String ,
  require : true
},
quantity :{
  type : Number ,
  require :true
},
price :{
  type : Number,
  require: true
},


description:{
  type: String
},
linkImage :{
  type : String
},
date_create :{
  type : Date,
  require: true
},
status:{
  type : Boolean,
  require : true
}




}, {collection :'Cake'});


var Cake = mongoose.model('Cake', CakeSchema);

function View() {
  return Cake
  .find()
  .then(function(cake) {
    return cake;
  })
  .catch(function(err) {
    return err;
  });
}

function ViewUser() {
  return Cake
  .find({status : false}).sort({date_create: -1}).limit(12)
  .then(function(cake) {
    return cake;
  })
  .catch(function(err) {
    return err;
  });
}



function Search(id,name) {

  if(id != ""  && name=="" ){
    return Cake
    .find({cake_type_ids: id})
    .then(function(cake) {
      return cake;
    })
    .catch(function(err) {
      retun(err);
    });
  }else if(id == ""  && name !=""){
    return Cake
    .find({name_cake : new RegExp(name)})
    .then(function(cake) {
      return cake;
    })
    .catch(function(err) {
      retun(err);
    });
  }else if(id != ""  && name !=""){
    return Cake
    .find({name_cake : new RegExp(name), cake_type_ids : id})
    .then(function(cake) {
      return cake;
    })
    .catch(function(err) {
      retun(err);
    });
  }else{
    return Cake
    .find({name_cake : new RegExp(name), cake_type_ids : id})
    .then(function(cake) {
      return cake;
    })
    .catch(function(err) {
      retun(err);
    });
  }
}

//
//
function SearchById(id){
  return Cake.findOne({_id:id})
  .then(function(cake) {
    console.log(cake);
    return cake;
  })
  .catch(function(err) {
    console.log(err);
    return err;
  });
}


//
function Update(id,name,size,quantity,price,description,link) {
  if(link != ""){

  return Cake.updateOne({_id : id},{
    name_cake : name ,
    name_size : size ,
    quantity : quantity,
    price : price,
    description : description,
    linkImage : link
    })
    .then(function(cake) {
      return cake;
      console.log(cake);
    })
    .catch(function(err) {
      retun(err);
    });
  }else{

    return Cake.updateOne({_id : id},{

      name_cake : name ,
      name_size : size ,
      quantity : quantity,
      price : price,
      description : description
      })
      .then(function(cake) {
        return cake;
        console.log(cake);
      })
      .catch(function(err) {
        retun(err);
      });
  }
}


function Insert(id,name,material,size,quantity,price,description,link) {
  return Cake
  .create({
    cake_type_ids : id,
    name_cake : name ,
    material : material,
    name_size : size ,
    quantity : quantity,
    price : price,
    description : description,
    linkImage : link,
    date_create: new Date(),
    status: false
  })
  .then(function(cake) {
    return cake;
    console.log(cake);
  })
  .catch(function(err) {
    retun(err);
  });
}



function Lock(id){
    return   Cake.updateOne({_id : id},{status : true})
    .then(function(cake) {
      return cake;
      console.log(cake);
    })
    .catch(function(err) {
      retun(err);
    });
}


function unLock(id){
    return   Cake.updateOne({_id : id},{status : false})
    .then(function(cake) {
      return cake;
      console.log(cake);
    })
    .catch(function(err) {
      retun(err);
    });
}
module.exports = {
  View : View,
Search : Search,
Insert:Insert,
SearchById : SearchById,
Update: Update,
Lock : Lock,
unLock : unLock,
ViewUser : ViewUser
}
