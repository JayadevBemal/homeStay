

const mongoose = require('mongoose')

const userSchema = ({
firstname:{type: String,
  required: true
},
lastname: String,
email: {
  type: String,
  required: true,
  unique: true
},
password: {
  type: String,
  required: true
},
userType: {
  type: String,
  enum: ['guest','host'],
  default: 'guest'
},
favourites:[{
  type: mongoose.Schema.Types.ObjectId,
  ref:'Home'
}]
})

module.exports = mongoose.model('user',userSchema)