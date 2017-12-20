const Blog = require('../Model/Blog')
var exports = [];


exports.InsertBlog =  function(req,res){
  res.render("views/Admin/InsertBlog",{username : req.user.name,link : req.user.linkImage});
}
exports.UploadBlog = function(req,res){
  var blog_title = req.body.blog.title;
  var blog_description = req.body.blog.content;

  var content = [];
  for(var i = 0 ; i < 10; i++){
    if(!req.files[i])
    {
      content.push("");
    }else{
      content.push(req.files[i].path);
    }
  }
  Blog.Insert(blog_title.toUpperCase(),blog_description,content)
  .then(function(blog){
    res.redirect("/InsertBlog")
  })



};

exports.BlogManage = function(req,res){
  Blog.View()
  .then(function(blog){
    res.render("views/Admin/ManageBlog",{result: blog,username : req.user.name,link : req.user.linkImage});
  })
};

exports.SearchBlog = function (req, res){

  var title = req.param('title');
  Blog.Search(title.toUpperCase())
  .then(function(blog){
    res.render("views/Admin/ManageBlog",{result: blog,username : req.user.name,link : req.user.linkImage});
  })


};

exports.BlogDetail = function(req,res){
  var o_id = req.param('id');
  var id = require('mongodb').ObjectID(o_id);
  Blog.blogDetail(id)
  .then(function(blog){
    res.render('views/Admin/BlogDetail',{result : blog,username : req.user.name,link : req.user.linkImage});
  })
}



exports.LockBlog = function(req,res){
  var o_id = req.param('id');
  var id = require('mongodb').ObjectID(o_id);
  Blog.Lock(id)
  .then(function(blog){
    res.redirect("/BlogManage")
  })


}

exports.UnLockBlog = function(req,res){
  var o_id = req.param('id');
  var id = require('mongodb').ObjectID(o_id);


  Blog.unLock(id)
  .then(function(blog){
    res.redirect("/BlogManage")
  })

}
module.exports = exports;
