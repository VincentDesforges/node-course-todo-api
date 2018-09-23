const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// const id = '5ba7ebd47d0f603c43fa69af';
const id = '5ba7c74b08232ed8348868af';

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });

// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }

// Todo.findById(id).then(todo => {
//   if(!todo) {
//     return console.log('ID not found')
//   }
//   console.log('TodoById', todo)
// }).catch(err => console.log(err));

if (!ObjectID.isValid(id)) {
  console.log('ID is not valid')
}

User.findById(id).then(user => {
  if(!user) {
    return console.log('ID not found :(')
  }
  console.log('UserByID', user);
}).catch(err => console.log(err));
