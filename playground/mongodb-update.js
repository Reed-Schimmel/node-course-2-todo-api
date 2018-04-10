const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {
  if (error) {
    return console.log('unable to connect to server', error);
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');  
  const todos = db.collection('Todos');
  const users = db.collection('Users');

  // change name to my name and increment age by 1
  users.findOneAndUpdate({
    _id: new ObjectID("5ac540406a2d4415f856c0c2")
  }, {
    $set: { name: "Reed" },
    $inc: { age: 1 }
  }, {
    returnOriginal: false
  }).then(result => console.log(result));

  // todos.findOneAndUpdate({
  //   _id: new ObjectID("5ac53f25a21ce81b9422c6ce")
  // }, {
  //   $set: { completed: true }
  // }, { returnOriginal: false })
  //   .then(result => console.log(result))
  //   .catch();

  client.close();
});
