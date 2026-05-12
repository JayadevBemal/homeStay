const express = require('express');
const todoitemRouter = express.Router();

const todoController = require('../controllers/todoItem');

todoitemRouter.post("/item",todoController.createTodoItem);

todoitemRouter.get("/items",todoController.getTodoItems);

todoitemRouter.put("/:id/completed",todoController.markCompleted);

todoitemRouter.delete("/:id",todoController.deleteItem);

module.exports = todoitemRouter;