const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const dataRepo = require("../DAL")

exports.returnTodos = async (req, res) => {
    try {
        res.json(dataRepo.getAllData());
    } catch (error) {
        console.log('Error reading todos file:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.addTodos = async (req, res) => {
    const { title } = req.body;
    try {
        const newTodo = {
            id: uuidv4(),
            title: title,
        };
        dataRepo.updateData(newTodo)
        res.status(201);
    } catch (error) {
        console.log('Error writing todos file:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteTodos = async (req, res) => {
    const { id } = req.params;
    try {
        const newJson = dataRepo.getAllData().filter((todo) => todo.id !== id);
        dataRepo.updateAllData(newJson);
        res.status(201);
    } catch (error) {
        console.log('Error writing todos file:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
