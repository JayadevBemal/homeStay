const { response } = require("express");
const todoItem = require("../models/todoItem");



exports.createTodoItem = async(req,res,next) => {
  console.log(req.body);
  const{name,date} = req.body;

  const todoitem = new todoItem({name,date});
  await todoitem.save();
  res.status(201).json(todoitem);

}

exports.getTodoItems = async (req,res,next) => {
  const todoitems = await todoItem.find();
  res.json(todoitems);
}

exports.deleteItem = async (req,res,next) => {
  const {id} = req.params;
  await todoItem.findByIdAndDelete(id);
  res.status(200).json({
    success: true
  });

}

exports.markCompleted = async (req,res,next) => {
  const {id} = req.params;
  const todoitem = await todoItem.findById(id);
  todoitem.completed = true ;
  await todoitem.save();
  res.json(todoitems);
  

}