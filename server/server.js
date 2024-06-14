const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const users = require('./db')

const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send("Hello! Node.js");
});

app.get('/users', (req, res) => {
    res.json(users)
})

app.get('/users/:id', (req, res) => {
    res.json(users.find(user => user.id === Number(req.params.id)))
})

app.post('/users', (req, res) => {
    users.push(req.body)
    res.send(req.body)
})

app.put('/users/:id', (req, res) => {
    const updateIndex = users.findIndex(user => user.id === Number(req.params.id))
    res.send(`Update user id: '${users[updateIndex].id}' completed.`)
})

app.delete('/users/:id', (req, res) => {
    const deletedIndex = users.findIndex(user => user.id === Number(req.params.id))
    res.send(`Delete user '${users[deletedIndex].username}' completed.`)
})

app.listen(port, () => {
    console.log("Starting node.js at port " + port);
});