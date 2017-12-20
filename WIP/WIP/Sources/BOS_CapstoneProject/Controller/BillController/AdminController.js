const Bill = require('../../Model/Bill')
var exports = [];

exports.Bill = function(req,res){
  Bill.View()
  .then(function(bill){
    res.render("views/Admin/Bill",{result:bill,username : req.user.name,link : req.user.linkImage});

  })
};


exports.BillSearch = function(req,res){
  var search = req.param('datebill');
  var date = new Date(search);
  var today_search = new Date(date);
  var tomorrow_search = new Date(date.setDate(date.getDate()+1));
  Bill.Search(today_search,tomorrow_search)
  .then(function(bill){
    res.render("views/Admin/Bill",{result:bill,username : req.user.name,link : req.user.linkImage});
  })
}





exports.ConfirmBill = function(req,res){
  var o_id = req.param('id');
  var id = require('mongodb').ObjectID(o_id);
  Bill.confirmBill(id)
  .then(function(bill){
    Bill.View()
    .then(function(bill){
      res.render("views/Admin/Bill",{result:bill,username : req.user.name,link : req.user.linkImage});

    })
  })

}


exports.UnConfirmBill = function(req,res){
  var o_id = req.param('id');
  var id = require('mongodb').ObjectID(o_id);
  var date= new Date();
  Bill.unConfirmBill(id)
  .then(function(bill){
    Bill.View()
    .then(function(bill){
      res.render("views/Admin/Bill",{result:bill,username : req.user.name,link : req.user.linkImage});

    })
  })

}


exports.Revenue = function(req,res){
  Bill.Revenue()
  .then(function(bill){
    res.render("views/Admin/Revenue",{result:bill,username : req.user.name,link : req.user.linkImage});

  })
}
exports.RevenueSearchToday = function(req,res){
  var search = req.param('daterevenue');
  var date = new Date(search);
  var today_search = new Date(date);
  var tomorrow_search = new Date(date.setDate(date.getDate()+1));
  Bill.revenueSearch(today_search,tomorrow_search)
  .then(function(bill){
    res.render("views/Admin/Revenue",{result:bill,username : req.user.name,link : req.user.linkImage});
  })

}


exports.RevenueSearch = function(req,res){
  var fromdate = new Date(req.param('fromdate'));
  var date = new Date(req.param('todate'));
  var todate = new Date(date.setDate(date.getDate()+1));
  Bill.revenueSearch(fromdate,todate)
  .then(function(bill){
    res.render("views/Admin/Revenue",{result:bill,username : req.user.name,link : req.user.linkImage});
  })
}

module.exports = exports;
