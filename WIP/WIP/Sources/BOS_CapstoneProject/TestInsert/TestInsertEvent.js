const EventModel = require('../Schema/EventSchema');
const config = require('../config.json');
const mongoose = require('mongoose')

mongoose.connect(config.connectionString,(err)=>{
  if(err){
    console.log(err);
  }else {
    console.log('connect db success');;
  }
})


EventModel.create({
  title : "BAi 1",
  content : "Khong co noi dung",
  link: "123",
  date : new Date()

});
mongoose.connection.close();
