const Category = require('../Model/Category')

var exports = [];


exports.Category = function(req,res){
    res.render("views/Admin/InsertCategory",{username : req.user.name,link : req.user.linkImage});
};

exports.InsertCategory = function(req,res){
  var name_category = req.param('category');
  Category.Insert(name_category)
          .then(function(category){
          res.redirect('/Category')
})
.catch(function(err){
      console.log(err);
});

}
//Category Manager

exports.CakeCategoryManage = function (req, res){
  Category.View()
          .then(function(category){
            res.render("views/Admin/ManageCategory", {result : category,username : req.user.name,link : req.user.linkImage});

})



};


exports.LockCategory = function(req,res){
  var o_id = req.param('id');
  var id = require('mongodb').ObjectID(o_id);
  Category.Lock(id)
          .then(function(category){
          res.redirect('/CakeCategoryManage')
})
}

exports.UnLockCategory = function(req,res){
  var o_id = req.param('id');
  var id = require('mongodb').ObjectID(o_id);
  Category.unLock(id)
          .then(function(category){
          res.redirect('/CakeCategoryManage')
})


}
module.exports = exports;
