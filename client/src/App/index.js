import React, { Component } from 'react';
import TodoList from '../TodoList';
import NewTodoForm from '../NewTodoForm';
import socket from '../socket.js';

class App extends Component {
  state = { todos: [] };

  componentDidMount() {
    // This event if for loading the initial list of todos
    socket.on('load', todos => {
      this.setState({ todos: todos });
    });
    // This event is for adding the newly created todo to the list stored in state
    socket.on('addTodo', todo => {
      this.setState({
        todos: [...this.state.todos, todo]
      });
    });
    // This event is for updating the completion status of a todo
    socket.on('updateTodo', newTodo => {
      let todoList = this.state.todos;
      const index = todoList.findIndex(todo => todo.id === newTodo.id);
      todoList[index] = newTodo;
      this.setState({
        todos: todoList
      });
    });
  }

  render() {
    const { todos } = this.state;
    return (
      <div className="container">
        <TodoList todos={todos} />
        <NewTodoForm />
      </div>
    );
  }
}

export default App;
