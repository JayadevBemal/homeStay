const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  name:{type:String,required:true},
  date:{type:Date,required:true},
  completed:{type:Boolean,default:false},
  
},{timestamps:true})

module.exports = mongoose.model("TodoItem",todoSchema);