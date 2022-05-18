const express = require("express")
var cors = require('cors')
const res = require("express/lib/response")
const { Todo } = require("./database")
const user = require("./user")
const cookieParser = require('cookie-parser');

const app = express()
const PORT = process.env.PORT || 8000

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
  });

app.use(express.json())
app.use(cors())
app.use(cookieParser());

app.use('/user', user);


app.post("/todo", async (req, res) => {
    try {
        const { name } = req.body

        if (name == "") throw Error("Not empty")

        await Todo.create({ name, complete: false })

        res.status(200).json({ message: "Create success" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

app.get("/todos", async (req, res) => {
    try {
        const todos = await Todo.find({})
        res.status(200).json({ todos: todos })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Update by id: findOneAndUpdate// Delete by id: deleteOne
app.put("/todo/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { name } = req.body

        await Todo.findByIdAndUpdate(id, { name: name })

        const todos = await Todo.find({})
        res.status(200).json({ todos: todos })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

app.delete("/todo/:id", async (req, res) => {
    try {
        const { id } = req.params

        await Todo.findByIdAndRemove(id)

        const todos = await Todo.find({})
        res.status(200).json({ todos: todos })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})



app.listen(PORT, () => {
    console.log("Server is listening on :", PORT)
})
