const mongoose =require('mongoose')


function    connects(){

    mongoose.connect('mongodb://localhost:27017/Disaster_management_System')
    .then(()=>console.log('Mongodb connected...'))
    .catch((error)=>{console.log(error)})
}

module.exports = connects
    