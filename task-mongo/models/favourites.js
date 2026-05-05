const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/databaseUtil");


module.exports = class Favourite {

  constructor(homeId){this.homeId = homeId};

   addToFavourites() {
   const db = getDB();
   return db.collection('favourites').findOne({homeId: this.homeId}).then(data => {
    if(!data){
     return db.collection('favourites').insertOne(this);
    }else{
     return Promise.resolve();
    }
   })
  
  }

  static getFavourites() {
   const db = getDB();
   return db.collection('favourites').find().toArray();
  }

  static deleteFromFavlist(homeid, callback) {
   const db = getDB();
   db.collection('favourites').deleteOne({homeId: homeid})
  }
};
