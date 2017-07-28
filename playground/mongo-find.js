const {MongoClient, ObjectID} = require('mongodb');//ES6

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to MongoDB');
    }
    console.log('Connected to MongoDB server');

    //db.collection('Todos').find().toArray().then((docs) => {
    db.collection('Todos').find({_id: new ObjectID('597b295bc4bb086ec05bcdc9')}).toArray().then((docs) => {
    //db.collection('Todos').find({completed: true}).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });

    db.collection('Todos').find().count().then((count) => {
        console.log(`Todos count: ${count}` );
    }, (err) => {
        console.log('Count error: ', err);
    });

    var nameForSearch = 'Alexander';
    db.collection('Users').find({name: nameForSearch}).toArray().then((docs) => {
        console.log('Users:');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch users ', err);
    });



    db.collection('Users').find({name: nameForSearch}).count().then((count) => {
        console.log(`${nameForSearch} count: ${count}` );
    }, (err) => {
        console.log(`Count by ${nameForSearch} error: `, err);
    });

    db.close();
});
