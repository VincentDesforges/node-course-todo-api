const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// POST
app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, err => {
    res.status(400).send(err);
  });
});

// GET
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, err => {
    res.status(400).send(err);
  });
});

// GET todos/:id
app.get('/todos/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then(todo => {
    if(!todo) {
      return res.status(404).send();
    }
    res.status(200).send({todo});
  }).catch(err => {
    res.status(400).send();
  });
  // res.send(req.params);
});

// EDIT
app.patch('/todos/:id', (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
    .then(todo => {
      if (!todo) {
        return res.status(404).send
      }
      res.send({todo});
    }).catch(err => res.status(400).send())
});

// DELETE todos/:id
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then(todo => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch(err => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started listening on port ${port}`);
});

module.exports = {app};

// Old code: ---------------------------------
// https://pacific-anchorage-24324.herokuapp.com/

// const newTodo = new Todo({
//   text: 'Cook dinner'
// });

// const newTodo = new Todo({
//   text: 'Feed the cat',
//   completed: false,
//   completedAt: 123
// });

// const newTodo = new Todo({
//   text: '  Edit video   '
// });

// newTodo.save().then((doc) => {
//   console.log('Saved...', doc)
// }, e => {
//   console.log('Unable to save', e)
// });

// const user = new User({
//   email: 'andrew@example.com      '
// });

// user.save().then(doc => {
//   console.log("User saved", doc);
// }, err => {
//   console.log("Unable to save", err);
// });
