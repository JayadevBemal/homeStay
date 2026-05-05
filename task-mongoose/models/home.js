

const { ObjectId } = require("mongodb");

const mongoose = require('mongoose');
const Favourite = require("./favourites");


const homeSchema = mongoose.Schema({
  houseName: {type: String , required: true},
   pricePerNight: {type: Number , required: true},
    location: {type: String , required: true},
    rating: {type: Number , required: true},
     homeImage: String,
       description: String,
});

homeSchema.pre('findOneAndDelete',async function(){
  const homeId = this.getQuery()._id;
  console.log('came here');
  await Favourite.deleteMany({homeId:homeId});
})

module.exports = mongoose.model('Home',homeSchema);

