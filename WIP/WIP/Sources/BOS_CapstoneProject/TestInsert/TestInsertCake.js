const cakeModel = require('../Schema/CakeSchema');
const config = require('../config.json');
const mongoose = require('mongoose')

mongoose.connect(config.connectionString,(err)=>{
  if(err){
    console.log(err);
  }else {
    console.log('connect db success');;
  }
})


cakeModel.create( {
    
    name_cake : "Nướng",
    material: [{name_material:"Nước đường"},{name_material:"Dầu thực vật"}],
    name_size : "150g",
    quantum : 15,
    price: 180000,
    status :false,
    description: "Bánh được làm thủ công không chất bảo quản.",
    linkImage : "Upload\banhnuong.jpg",
    date_create: new Date()

})


mongoose.connection.close();
