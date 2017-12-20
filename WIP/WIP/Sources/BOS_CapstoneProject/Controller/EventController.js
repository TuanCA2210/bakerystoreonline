const Event = require('../Model/Event')
var exports = [];

exports.InsertEvent =  function(req,res){
  res.render("views/Admin/InsertEvent",{username : req.user.name,link : req.user.linkImage});
}

exports.UploadEvent = function(req,res){
  var event_title = req.body.event.title;
  var event_content = req.body.event.content;
  var event_link = req.file.path;
  Event.Insert(event_title.toUpperCase(),event_content,event_link)
  .then(function(event_all){
    res.redirect("/InsertEvent");
  })
};


exports.EventManage = function(req,res){
  Event.View()
  .then(function(event_all){
    res.render("views/Admin/ManageEvent",{result: event_all,username : req.user.name,link : req.user.linkImage});
  })
};



exports.SearchEvent = function (req, res){

  var title = req.param('title');
  Event.Search(title.toUpperCase())
  .then(function(event_all){
    res.render("views/Admin/ManageEvent",{result: event_all,username : req.user.name,link : req.user.linkImage});
  })


};
exports.LockEvent = function(req,res){
  var o_id = req.param('id');
  var id = require('mongodb').ObjectID(o_id);

  Event.Lock(id)
  .then(function(event_all){
    res.redirect('/ManageEvent');
  })
}

exports.UnLockEvent = function(req,res){
  var o_id = req.param('id');
  var id = require('mongodb').ObjectID(o_id);


  Event.unLock(id)
  .then(function(event_all){
    res.redirect('/ManageEvent');
  })
}
module.exports = exports;
