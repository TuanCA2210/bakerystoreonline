const BillModel = require('../Schema/BillSchema');
const config = require('../config.json');
const mongoose = require('mongoose')

mongoose.connect(config.connectionString,(err)=>{
  if(err){
    console.log(err);
  }else {
    console.log('connect db success');;
  }
})


BillModel.create({
  name_id:"5a089cfa08986c4404799c82",
  name: "Tuan",
  phone : "0987455644",
  address : "Phu Tho",
  email : "anhhtv01@gmail.com",
  cake:[{
  cake_name: "Bánh Tét",
  price : 35000,
  quantity : 3}
  ],
  confirm : false,
  time : new Date ()

});
mongoose.connection.close();
