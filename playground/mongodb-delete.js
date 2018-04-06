const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {
  if (error) {
    return console.log('unable to connect to server', error);
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');  
  const todos = db.collection('Todos');
  // delete many
  // todos.deleteMany({text: "eat lunch"}).then(result => console.log(result));

  // delete one
  // todos.deleteOne({text: 'eat lunch'}).then(result => console.log(result));

  // find one and delete
  todos.findOneAndDelete({completed: false}).then(result => console.log(result));

  client.close();
});
