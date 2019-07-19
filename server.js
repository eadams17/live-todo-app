const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const uuidv4 = require('uuid/v4');
const firstTodos = require('./data');

// This is going to be our fake 'database' for this application
const database = firstTodos.map(todo => {
  // Generate UUIDs for seed todos
  todo.uuid = uuidv4();
  return todo;
});

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

  // Sends a message to all connections to delete todo
  const deleteTodo = todoIndex => {
    io.sockets.emit('deleteTodo', todoIndex);
  };

  // Sends a message to the client that todo already exists
  const sendError = error => {
    client.emit('receiveError', error);
  };

  // Accepts when a client makes a new todo
  client.on('make', todo => {
    // Check if todo already exists (case insensitive)
    const todoExists = database.find(
      object => object.title.toLowerCase() === todo.title.toLowerCase()
    );
    if (todoExists) {
      sendError('Todo already exists!');
      return;
    }

    // Make a new todo
    const newTodo = {
      uuid: uuidv4(),
      title: todo.title,
      completed: false
    };

    // Add new todo to our database
    database.push(newTodo);
    console.log(database);

    // Send new todo to the client
    addTodo(newTodo);
  });

  // Accepts when a client updates completion status of a todo
  client.on('update', todo => {
    const index = database.findIndex(object => object.uuid === todo.uuid);
    const updatedTodo = database[index];
    updatedTodo.completed = !updatedTodo.completed;

    // Send updated todo to the client
    updateTodo(updatedTodo);
  });

  // Accepts when a client deletes a todo
  client.on('delete', todo => {
    const todoIndex = database.findIndex(object => object.uuid === todo.uuid);
    database.splice(todoIndex, 1);
    console.log('database', database);

    // Send updated todo to the client
    deleteTodo(todoIndex);
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
