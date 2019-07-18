const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const firstTodos = require('./data');
const Todo = require('./todo');

// This is going to be our fake 'database' for this application
// Parse all default Todo's from database
const database = firstTodos.map(todo => {
  // Form new Todo objects
  return new Todo((title = todo.title));
});

// serve static files
app.use(express.static('./'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html', error => {
    if (error) {
      next(error);
    }
  });
});

io.on('connection', client => {
  console.log(`New connection at ID: ${client.id}`);

  // Sends a message to the client to reload all todos
  const reloadTodos = () => {
    client.emit('load', database);
  };

  // sends a message to all connections to add the new todo
  const addTodo = todo => {
    io.sockets.emit('addTodo', todo);
  };

  // Accepts when a client makes a new todo
  client.on('make', todo => {
    // Make a new todo
    const newTodo = new Todo((title = todo.title));

    // Add new todo to our database
    database.push(newTodo);

    // Send new todo to the client
    addTodo(newTodo);
  });

  // Send the database downstream on connect
  reloadTodos();
});

// establish connection

console.log('Waiting for clients to connect');

server.listen(3003, error => {
  if (error) {
    console.log(error);
  }
  console.log('listening on port 3003');
});
