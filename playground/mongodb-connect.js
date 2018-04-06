const { MongoClient, ObjectID } = require('mongodb');

// let obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {
  if (error) {
    return console.log('unable to connect to server', error);
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');  

  // db.collection('Todos').find().count()
  //   .then(count => {
  //     console.log('Todos count', count);
  //   }).catch(error => console.log(error));

  db.collection('Users').find({name: 'Bob'}).toArray()
    .then(docs => {
      console.log('Todos');
      console.log(JSON.stringify(docs, undefined, 2));
    }).catch(error => console.log(error));

  client.close();
});






/*
{ 
db.collection('Todos').insertOne({
  text: 'Something to do',
  completed: false,
  }, (error, result) => {
    if (error) {
      return console.log('Unable to insert into database', error);
    }

    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  Insert new doc into Users (name, age, location)
  db.collection('Users').insertOne({
    name: 'Reed Schimmel',
    age: 21,
    location: 'Wichita, KS',
  },(error, result) => {
    if (error) {
      return console.log('Unable to insert data into Users', error);
    }

    console.log(JSON.stringify(result.ops, undefined, 2));
 });
}*/