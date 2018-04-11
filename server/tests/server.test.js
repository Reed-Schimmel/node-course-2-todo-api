const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server');
const { Todo } = require('../models/todo');
const { User } = require('../models/user');

const todos = [{
  _id: new ObjectID(),
  text: 'first test todo'
}, {
  _id: new ObjectID(),  
  text: 'second test todo',
  completed: true,
  completedAt: 456
}];

beforeEach(done => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', done => {
    const text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) return done(err);

        Todo.find({ text }).then(todos => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch(error => done(error));
      })
  });

  it('should not create todo with invalid body data', done => {
    request(app).post('/todos').send({}).expect(400).end((error, response) => {
      if (error) return done(error);

      Todo.find().then(todos => {
        expect(todos.length).toBe(2);
        done();
      }).catch(e => done(e));
    })
  });
});

describe('GET /todos', () => {
  it('should get all todos', done => {
    request(app).get('/todos').expect(200).expect(res => {
      expect(res.body.todos.length).toBe(2);
    }).end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', done => {
    request(app).get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', done => {
    // make sure you get a 404
    request(app).get(`/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .expect(res => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });

  it('it should return 404 for non-object ids', done => {
    // /todos/123
    request(app).get('/todos/123')
    .expect(404)
    .expect(res => {
      expect(res.body).toEqual({});
    })
    .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should removed todo doc', done => {
    const hexId = todos[1]._id.toHexString()
    request(app).delete(`/todos/${hexId}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo._id).toBe(hexId);
        // expect(res.body.todo.text).toBe(todos[1].text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        // query database using findById toNotExist
        Todo.findById(hexId).then(todo => {
          expect(todo).toBeNull();
          done();
        }).catch(e => done(e));
      });
  });

  it('should return 404 if todo not found', done => {
    // make sure you get a 404
    request(app).delete(`/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .expect(res => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });

  it('it should return 404 for non-object ids', done => {
    // /todos/123
    request(app).delete('/todos/123')
    .expect(404)
    .expect(res => {
      expect(res.body).toEqual({});
    })
    .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update the todo', done => {
    const id = todos[0]._id.toHexString();
    const newText = 'new text homie-G';

    request(app).patch(`/todos/${id}`).send({
      text: newText,
      completed: true,
    }).expect(200)
      .expect(res => {
        const { text, completed, completedAt } = res.body.todo;

        expect(text).toBe(newText);
        expect(completed).toBe(true);
        expect(typeof completedAt).toBe('number');
      }).end(done);
  });

  it('should clear completedAt when todo is not completed', done => {
    const id = todos[1]._id.toHexString();
    const newText = 'I still need to do it!';

    request(app).patch(`/todos/${id}`).send({
      text: newText,
      completed: false,
    }).expect(200)
      .expect(res => {
        const { text, completed, completedAt } = res.body.todo;
        expect(text).toBe(newText);
        expect(completed).toBe(false);
        expect(completedAt).toBe(null);
      }).end(done);
  });
})