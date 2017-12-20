//1.require mongoose
const mongoose = require('mongoose')


//3.tao schema
const Schema = mongoose.Schema;

var BlogSchema = new Schema({
  ImagePanel : {
    type : String ,
    require : true
},
  date_create:{
    type : Date,
    require: true
  },
  blocked : {
    type : Boolean,
    require: true
},
title :{
  type : String,
  require:true
},
content:[{
        description: String,
        linkImage:String

}]

}, {collection :'Blog'});

var Blog = mongoose.model('Blog', BlogSchema);

function View() {
  return Blog
  .find().sort( { date_create: -1 } )
  .then(function(blog) {
    return blog;
  })
  .catch(function(err) {
    return err;
  });
}

function ViewUser() {
  return Blog
  .find({blocked : false}).sort( { date_create: -1 } )
  .then(function(blog) {
    return blog;
  })
  .catch(function(err) {
    return err;
  });
}

function SearchById(id , title) {

  if(id != ""  && title=="" ){
    return Blog
    .find({_id: id})
    .then(function(blog) {
      return blog;
    })
    .catch(function(err) {
      retun(err);
    });
  }else if(id == ""  && title !=""){
    return Blog
    .find({title : new RegExp(title)})
    .then(function(blog) {
      return blog;
    })
    .catch(function(err) {
      retun(err);
    });
  }else if(id != ""  && title !=""){
    return Blog
    .find({title : new RegExp(title), _id : id})
    .then(function(blog) {
      return blog;
    })
    .catch(function(err) {
      retun(err);
    });
  }else{
    return Blog
    .find({title : new RegExp(title), _id : id})
    .then(function(blog) {
      return blog;
    })
    .catch(function(err) {
      retun(err);
    });
  }
}


function Search(title) {

  return Blog
  .find({title:new RegExp(title)}).sort( { date_create: -1} )
  .then(function(blog) {
    return blog;
  })
  .catch(function(err) {
    return(err);
  });

}

//
//


//


function Insert(title,blog_description,content) {

  return Blog.create({
    ImagePanel : content[0],
    title : title,
    date_create: new Date(),
    blocked : false,
    content : [
      {description : blog_description[0], linkImage : content[1]},
      {description : blog_description[1], linkImage : content[2]},
      {description : blog_description[2], linkImage : content[3]},
      {description : blog_description[3], linkImage : content[4]},
      {description : blog_description[4], linkImage : content[5]},
      {description : blog_description[5], linkImage : content[6]},
      {description : blog_description[6], linkImage : content[7]},
      {description : blog_description[7], linkImage : content[8]},
      {description : blog_description[8], linkImage : content[9]},
      {description : blog_description[9], linkImage : content[10]},
    ]
  })
  .then(function(blog) {
    return blog;
  })
  .catch(function(err) {
    return(err);
  });
}

function blogDetail(id){
  return Blog.findOne({_id:id})
              .then(function(blog){
return blog;
})
.catch(function (err){
return err
});
}

function Lock(id){
  return   Blog.updateOne({_id : id},{blocked : true})
  .then(function(blog) {
    return blog;
  })
  .catch(function(err) {
    return(err);
  });
}


function unLock(id){
  return   Blog.updateOne({_id : id},{blocked : false})
  .then(function(blog) {
    return blog;
  })
  .catch(function(err) {
    return(err);
  });
}
module.exports = {
  View : View,
  Search : Search,
  Insert:Insert,
  blogDetail : blogDetail,
  Lock : Lock,
  unLock : unLock,
ViewUser : ViewUser,
SearchById : SearchById
}
