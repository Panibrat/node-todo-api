const {MongoClient, ObjectID} = require('mongodb');//ES6

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to MongoDB');
    }
    console.log('Connected to MongoDB server');

    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('597b183cf92eeb1cc454bdba')
    },{
        $set: {
            completed: true
        }
    },{
        returnOriginal: false
    }).then((result)=>{
        console.log(result);
    });



    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('597b28762da35c193086f20b')
    },{
        $inc: {
            age: 1
        },
        $set: {
            name: 'Petya',
            location: "New-York"
        }
    },{
        returnOriginal: false
    }).then((result)=>{
        console.log(result);
    });

    db.close();
});
