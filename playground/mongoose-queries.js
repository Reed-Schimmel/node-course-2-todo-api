const { ObjectID } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

const userId = "5accb20248dbe41b5c4dfb88";

if (!ObjectID.isValid(userId)) {
  console.log('ID is not Valid');
}

User.findById(userId)
  .then(user => {
    if (!user) return console.log('User by that id does not exist');
    console.log(JSON.stringify(user, undefined, 2));
  })
  .catch(e => console.log(e));


// const id = '6acd1177e7fe7b37d884cbed**';

// if (!ObjectID.isValid(id)) {
//   console.log('ID is not Valid');
// }

// Todo.find({
//   _id: id
// }).then(todos => console.log('Todos', todos)).catch();

// Todo.findOne({
//   _id: id
// }).then(todo => console.log('Todo', todo)).catch();

// Todo.findById(id).then(todo => {
//   if (!todo) return console.log('id not found')
//   console.log('Todo By ID', todo)
// }).catch();