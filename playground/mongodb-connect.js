//const MongoClient = require('mongodb').MongoClient;// ES5
//const {MongoClient} = require('mongodb');//ES6
const {MongoClient, ObjectID} = require('mongodb');//ES6

var obj = new ObjectID();
console.log(`OBJ:${obj}`);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to MongoDB');
    }
    console.log('Connected to MongoDB server');
    //console.log(db);
    db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false
    }, (err, result) => {
        if(err){
            return console.log('Unable to insert todo', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });
    db.collection('Users').insertOne({
        name: 'Alexander',
        age: 36,
        location: 'Kiev'
    }, (err, result) => {
        if(err){
            return console.log('Unable to insert user', err);
        }
        //console.log(JSON.stringify(result.ops, undefined, 2));
        console.log(result.ops);
        console.log(result.ops[0]._id.getTimestamp());
    });

    db.close();
});
