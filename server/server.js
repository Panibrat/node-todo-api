require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
const {ObjectID} = require('mongodb');

var app = express();
const port = process.env.PORT;

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

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    // console.log(`ID: ${id}`);
    //console.log(`BODY: ${JSON.stringify(body, undefined, 2)}`);
    // console.log(`BODY: ${JSON.stringify(req.body)}`);
    // res.send();
    if(!ObjectID.isValid(id)){
        console.log('Todo ID is not valid!');
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        console.log(`UPDATED : ${todo}`);
        //console.log(`BODY : ${body}`);
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.listen(port, () =>{
    console.log(`Started on port ${port}`);
    console.log(`ENV:  ${process.env.NODE_ENV}`);
});


module.exports = {app};
