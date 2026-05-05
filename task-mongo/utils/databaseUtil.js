const mongo = require('mongodb');
const mongoClient = mongo.MongoClient;

const MONGO_URL = "mongodb://rootuser:rootpassword@ac-gwiocms-shard-00-00.ntfaamf.mongodb.net:27017,ac-gwiocms-shard-00-01.ntfaamf.mongodb.net:27017,ac-gwiocms-shard-00-02.ntfaamf.mongodb.net:27017/?ssl=true&replicaSet=atlas-160iez-shard-0&authSource=admin&appName=firsttime";

let _db;

const mongoConnect = (callback) => {

  mongoClient.connect(MONGO_URL).then(client => {
   console.log('connected')
   _db = client.db('airbnb');
   callback() ;
}).catch(err => console.log('error',err))

}

const getDB = () => {
  if(!_db){
    throw new Error('Mongo not Connected')
  }
  return _db;
}
exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
