const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');
var {Todo} = require('./../../models/todo');
var {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
//users[0].tokens[0].token)
const users = [{
    _id: userOneId,
    email: 'pan@gmail.com',
    password: 'Pan@4571',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
    }]
}, {
    _id: userTwoId,
    email: 'two@gmail.com',
    password: '123qwe',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userTwoId, access: 'auth'}, 'abc123').toString()
    }]
}];

const todos = [{
    _id: new ObjectID('597dc9a65d7829212ccd54fe'),
    //_id: new ObjectID('597dc9a65d7829212ccd54fa'),
    text: 'First text todo',
    _creator: userOneId
},{
    _id: new ObjectID('597dc9a65d7829212ccd54ff'),
    text: 'Second text todo',
    completed: true,
    completedAt: 1234567,
    _creator: userTwoId
}];

const populateTodos = (done) => {
    Todo.remove({})
        .then(() => {
            return Todo.insertMany(todos);
        })
        .then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
      var userOne = new User(users[0]).save();
      var userTwo = new User(users[1]).save();

      return Promise.all([userOne, userTwo])
  }).then(() => done());
};




module.exports = {todos, populateTodos, populateUsers, users};