var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
const {ObjectID} = require('mongodb');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.status(200).send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    console.log(id);
    if(!ObjectID.isValid(id)){
        console.log('Todo ID is not valid!');
        return res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if(!todo){
            console.log('ID not found :(');
            return res.status(404).send();
        }
        res.send({todo});
        console.log('Todo by ID: ', todo);
    }).catch((e) => {
        console.log('Errrrr:', e);
        return res.status(400).send();
    });
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    console.log(id);
    if(!ObjectID.isValid(id)){
        console.log('Todo ID is not valid!');
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo){
            console.log('ID not found :(');
            return res.status(404).send();
        }
        res.send({todo});
        console.log('Todo by ID deleted: ', todo);
    }).catch((e) => {
        console.log('Errrrr:', e);
        return res.status(400).send();
    });
});

app.listen(port, () =>{
    console.log(`Started on port ${port}`);
});

module.exports = {app};







/*
var newTodo = new Todo({
    text: 'Cook dinner'
});

newTodo.save().then((doc) => {
    console.log("Saved todo", doc);
}, (err) => {
    console.log("Unable to save todo", err);
});

var task = new Todo({
    text: 'Fix controller',
    completed: true,
    completedAt: 12314554
});
//task.save();
task.save().then((doc) => {
    console.log("Saved todo: ", JSON.stringify(doc, undefined, 2));
}, (err) => {
    console.log("Unable to save todo", err);
});


var vasya = new User({
    name: 'Vasya',
    email: 'vasya@gmail.com',
    age: 19,
    password: '123456'
});

vasya.save().then((doc) => {
    console.log(`User created: ${JSON.stringify(doc, undefined, 2)}`);
}, (err) => {
    console.log('Error to save user: ', err);
});*/
