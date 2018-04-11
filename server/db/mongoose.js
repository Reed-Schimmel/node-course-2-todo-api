const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = { mongoose };


// const Todo = mongoose.model('Todo', {
//   text: {
//     type: String,
//     required: true,
//     minLength: 1,
//     trim: true,
//   },
//   completed: {
//     type: Boolean,
//     default: false,
//   },
//   completedAt: {
//     type: Number,
//     default: null,
//   }
// });

// const newTodo = new Todo({
//   text: 'Cook dinner',
//   completed: true,
//   completedAt: new Date().getMilliseconds()
// });

// newTodo.save()
//   .then(doc => console.log(doc))
//   .catch(error => console.log(error));

  // User
  // email - require, trim, type, min length 1
// const User = mongoose.model('User', {
//   email: {
//     type: String,
//     required: true,
//     minLength: 1,
//     trim: true,
//   }
// });

// const newUser = new User ({
//   email: 'reeder960@gmail.com'
// });

// newUser.save()
//   .then(doc => console.log(doc))
//   .catch(error => console.log(error));
