const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  // console.log(req.body);
  const todo = new Todo({
    text: req.body.text
  });

  todo.save()
    .then(doc => res.send(doc))
    .catch(error => res.status(400).send(error));
});

app.get('/todos', (req, res) => {
  Todo.find() // get all
    .then(todos => res.send({ todos }))
    .catch(e => res.status(400).send(e));
});

app.get('/todos/:id', (req, res) => {
  const { id } = req.params;
  // Valid id using isValid
    // 400 send back empty body
  if (!ObjectID.isValid(id)) {
    return res.status(400).send(); // bad request
  }

  // find by id
    // success
      // if todo - send it back
      // if no todo - send back 404 with empty body
    // error
      // 400 - and send empty body

  Todo.findById(id)
    .then(todo => {
      if (!todo) return res.status(404).send(); // not found

      res.send({ todo })
    })
    .catch(error => res.status(400).send());


});

app.listen(3000, () => console.log('Started on port 3000'));

module.exports = { app };
