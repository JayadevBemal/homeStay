const { ObjectId } = require("mongodb");

const mongoose = require('mongoose');


const favouritesSchema = mongoose.Schema({
  homeId:{type: mongoose.Schema.Types.ObjectId,
          ref:'Home',
          required: true,
          unique: true
  },
})

module.exports = mongoose.model('Favourite',favouritesSchema)