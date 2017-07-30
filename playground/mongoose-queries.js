const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '697dc9a65d7829212ccd54fe';
var id = '597dc9a65d7829212ccd54fe';
var user_id = '1597bc1c952b0372be4059355';



Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos: ', todos);
})

Todo.findOne()
    .then((todo) => {
    console.log('Todo: ', todo);
});

Todo.findById(id).then((todo) => {
    if(!todo){
        return console.log('ID not found :(');
    }
    console.log('Todo by ID: ', todo);
});

User.findById(user_id).then((user) => {
    if(!user){
        return console.log('User ID not found :(');
    }
    if(!ObjectID.isValid(user_id)){
        return console.log('User ID is not valid!');
    }
    console.log('User by ID: ', user);
}).catch((e) => {
    console.log('Errrrror: ', e);
});