var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

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

app.listen(3000, () =>{
    console.log('Started on port 3000');
});









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
