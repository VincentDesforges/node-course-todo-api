const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();

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
// EDIT
// DELETE

app.listen(3000, () => {
  console.log('Started listening on port 3000');
});

module.exports = {app};

// Old code: ---------------------------------

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
