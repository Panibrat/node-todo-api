const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//Todo.remove({});

//Todo.findOneAndRemove({});

Todo.findByIdAndRemove('qwe34q34q').then((todo) => {
    console.log(todo);
});