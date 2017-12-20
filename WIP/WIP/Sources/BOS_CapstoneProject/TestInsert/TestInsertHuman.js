const humanModel = require('../Schema/HumanSchema');
const config = require('../config.json');
const mongoose = require('mongoose')

mongoose.connect(config.connectionString,(err)=>{
  if(err){
    console.log(err);
  }else {
    console.log('connect db success');;
  }
})

humanModel.create({
  name : "Kien",
  phone : "01234556781",
  password: "customer",
  email : "xuanha31@gmail.com",
  address : " Ha Noi",
  role : 1,
  note : "Thang ml",
  date_create: new Date(),
  date_update: new Date(),
  black_list : false
});
humanModel.create({
  name : "Tuan",
  phone : "01234556781",
  password: "staff",
  email : "xuanha31@gmail.com",
  address : " Ha Noi",
  role :2,
  date_create: new Date(),
  date_update: new Date(),
  black_list : true
});
humanModel.create({
  name : "Admin",
  phone : "0985222215",
  password: "admin",
  email : "xuanha31@gmail.com",
  address : " Ha Noi",
  role :3,
  date_create: new Date(),
  date_update: new Date(),
  black_list : true
});
mongoose.connection.close();
