
const {mongoConnect,getDB} = require('../utils/databaseUtil');
const { ObjectId } = require("mongodb");


module.exports = class Home {
  constructor(
    houseName,
    pricePerNight,
    location,
    rating,
    homeImage,
    _id,
    description,
  ) {
    this.houseName = houseName;
    this.pricePerNight = pricePerNight;
    this.location = location;
    this.rating = rating;
    this.homeImage = homeImage;
    this._id = _id;
    this.description = description;
  }

  save() {
    if(this._id){

      const db = getDB();
      const {_id,...updateData} = this;
      return db.collection('homes').updateOne({_id: new ObjectId(this._id)},{$set:updateData})
     
    }else{
     const db = getDB();
     return db.collection('homes').insertOne(this);
    }
    
    }

    
  
  static fetchAll(callback) {
   const db = getDB();
   return db.collection('homes').find().toArray();

   
  }

  static findById(homeId) {
    const db = getDB();
   return db.collection('homes').find({_id: new ObjectId(homeId)}).next();

    
  }

  static deleteById(homeId) {
      const db = getDB();
      return db.collection('homes').deleteOne({_id: new ObjectId(homeId)})
   
  }
};
