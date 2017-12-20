const Bill = require('../../Model/Bill')
var exports = [];

exports.Bill = function(req,res){
  Bill.View()
  .then(function(bill){
    res.render("views/Staff/Bill",{result:bill,username : req.user.name,link : req.user.linkImage});

  })
};


exports.BillSearch = function(req,res){
  var search = req.param('datebill');
  var date = new Date(search);
  var today_search = new Date(date);
  var tomorrow_search = new Date(date.setDate(date.getDate()+1));
  Bill.Search(today_search,tomorrow_search)
  .then(function(bill){
    res.render("views/Staff/Bill",{result:bill,username : req.user.name,link : req.user.linkImage});
  })
}





exports.ConfirmBill = function(req,res){
  var o_id = req.param('id');
  var id = require('mongodb').ObjectID(o_id);
  Bill.confirmBill(id,req.user._id,req.user.email)
  .then(function(bill){
    Bill.View()
    .then(function(bill){
      res.render("views/Staff/Bill",{result:bill,username : req.user.name,link : req.user.linkImage});

    })
  })

}


exports.UnConfirmBill = function(req,res){
  var o_id = req.param('id');
  var id = require('mongodb').ObjectID(o_id);
  var date= new Date();
  Bill.unConfirmBill(id,req.user._id,req.user.email)
  .then(function(bill){
    Bill.View()
    .then(function(bill){
      res.render("views/Staff/Bill",{result:bill,username : req.user.name,link : req.user.linkImage});

    })
  })

}
exports.Seen = function(req,res){
  var o_id = req.param('id');
  var id = require('mongodb').ObjectID(o_id);
  var date= new Date();
  Bill.Seen(id,req.user._id,req.user.email)
  .then(function(bill){
    Bill.View()
    .then(function(bill){
      res.render("views/Staff/Bill",{result:bill,username : req.user.name,link : req.user.linkImage});

    })
  })

}
exports.updateNote = function(req,res){
  var o_id = req.param('id');
  var id = require('mongodb').ObjectID(o_id);
  var date= new Date();
  var note = req.param('note');
  console.log(note);
  Bill.updateNote(id,note,req.user._id,req.user.email)
  .then(function(bill){
    Bill.View()
    .then(function(bill){
      res.render("views/Staff/Bill",{result:bill,username : req.user.name,link : req.user.linkImage});

    })
  })

}


module.exports = exports;
