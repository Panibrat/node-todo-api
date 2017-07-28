const {MongoClient, ObjectID} = require('mongodb');//ES6

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to MongoDB');
    }
    console.log('Connected to MongoDB server');
//deleteMany
    /*db.collection('Todos').deleteMany({text: "Eat dinner"}).then((result) => {
        console.log(result);
    });*/
//deleteOne
    /*db.collection('Todos').deleteOne({text: "Eat dinner"}).then((result) => {
        console.log(result);
    });*/
//findOneAndDelete
    /*db.collection('Todos').findOneAndDelete({completed: true}).then((result) => {
        console.log(result);
    });*/
    db.collection('Users').deleteMany({name: "Alexander"});
//findOneAndDelete
    db.collection('Users').findOneAndDelete({_id: new ObjectID('597b21767628ee19e851455e')}).then((result) => {
        console.log(result);
    });

//deleteMany
/*    db.collection('Users').deleteMany({name: "Alexander"}).then((result) => {
        console.log(result);
    });*/

    db.close();
});
