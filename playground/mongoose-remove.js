const { ObjectID } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

// Todo.remove({})

// Todo.findOneAndRemove({}).then(doc)
// Todo.findByIdAndRemove("5acd79dcf91d502a8f381acc")
//   .then(todo => console.log(todo));