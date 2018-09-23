const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // findOneAndUpdate:
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5ba7b8d45d84eb87b66663e6')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then( result => console.log(result) );


  // db.collection('Users').findOneAndUpdate({
  //   _id: new ObjectID("5ba7b0d336f040280e3f3d5f")
  // }, {
  //   $set: {
  //     name: 'Vincent'
  //   }
  // }, {returnOriginal: false}).then( result => console.log(result) );

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID("5ba7b0d336f040280e3f3d5f")
  }, {
    $inc: {age: 1}
  }, {returnOriginal: false}).then( result => console.log(result) );

  // db.close();
});
