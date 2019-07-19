const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// This is going to be our fake 'database' for this application
const database = require('./data');

io.on('connection', client => {
  console.log(`New connection at ID: ${client.id}`);

  // Sends a message to the client to reload all todos
  const reloadTodos = () => {
    client.emit('load', database);
  };

  // Sends a message to all connections to add the new todo
  const addTodo = todo => {
    io.sockets.emit('addTodo', todo);
  };

  // Sends a message to all connections to update todo
  const updateTodo = todo => {
    io.sockets.emit('updateTodo', todo);
  };

  // Accepts when a client makes a new todo
  client.on('make', todo => {
    // Make a new todo
    const newTodo = {
      id: database.length + 1,
      title: todo.title,
      completed: false
    };

    // Add new todo to our database
    database.push(newTodo);

    // Send new todo to the client
    addTodo(newTodo);
  });

  // Accepts when a client updates completion status of a todo
  client.on('update', todo => {
    const index = database.findIndex(object => object.id === todo.id);
    const updatedTodo = database[index];
    updatedTodo.completed = !updatedTodo.completed;

    // Send updated todo to the client
    updateTodo(updatedTodo);
  });

  // Send the database downstream on connect
  reloadTodos();
});

// Establish connection

console.log('Waiting for clients to connect');

server.listen(3003, error => {
  if (error) {
    console.log(error);
  }
  console.log('listening on port 3003');
});
