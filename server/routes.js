const express = require('express')
const router = express.Router();

const { getConnectedClient } = require("./db");
const { ObjectId } = require('mongodb');

const getCollection = () => {
    const client = getConnectedClient();
    const collection = client.db("todosDb").collection("todo");
    return collection;
}

router.get("/todos", async (req, res) => {
    const collection = getCollection();
    const todos = await collection.find({}).toArray();
    res.status(200).json(todos);
});

router.post("/todos", async (req, res) => {
    const collection = getCollection();
    let { todo } = req.body;
    todo=(typeof todo==="string") ? todo: JSON.stringify(todo);
    const newTodo = await collection.insertOne({ todo, status: false });
    res.status(201).json({ todo, status: false, _id: newTodo.insertedId });
});

router.delete("/todos/:id", async (req, res) => {
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);
    const deleteTodo = await collection.deleteOne({ _id });
    res.status(200).json(deleteTodo);
});

router.put("/todos/:id", async (req, res) => {
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);
    const { status } = req.body;
    const updatedTodo = await collection.updateOne({ _id }, { $set: { status: !status } });
    res.status(200).json(updatedTodo)
});

module.exports = router;