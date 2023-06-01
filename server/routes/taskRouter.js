const express = require("express");
const taskRouter = new express.Router();
const task_controller = require("../controllers/taskController");

taskRouter.use(express.json());

taskRouter.get('/todo', task_controller.returnTodos);
taskRouter.post('/todo', task_controller.addTodos);
taskRouter.delete('/todo/:id', task_controller.deleteTodos);

module.exports = {taskRouter};
