const express = require('express');
const res = require('express/lib/response');
const { Todo } = require('./database');

const app = express();
const PORT = 8000;

app.use(express.json());

app.post('/todo', async (req, res) => {
    try {
        const {name} = req.body;

        if (name == '') throw Error('Not empty'); 

        await Todo.create({ name, complete: false });

        res.status(200).json({message: 'Create success'});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.status(200).json({todos: todos});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

// Update by id: findOneAndUpdate// Delete by id: deleteOne

app.listen(PORT, () => {
    console.log('Server is listening on :', PORT);
});
