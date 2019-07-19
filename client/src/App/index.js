import React, { Component } from 'react';
import TodoList from '../TodoList';
import NewTodoForm from '../NewTodoForm';
import socket from '../socket.js';
import styles from './style.module.css';

class App extends Component {
  state = { todos: [], error: '' };

  componentDidMount() {
    // This event if for loading the initial list of todos
    socket.on('load', todos => {
      this.setState({ todos: todos });
    });
    // This event is for adding the newly created todo to the todo list
    socket.on('addTodo', todo => {
      this.setState({
        todos: [...this.state.todos, todo],
        error: ''
      });
    });
    // This event is for updating the completion status of a todo
    socket.on('updateTodo', newTodo => {
      let todoList = this.state.todos;
      const index = todoList.findIndex(todo => todo.uuid === newTodo.uuid);
      todoList[index] = newTodo;
      this.setState({
        todos: todoList
      });
    });
    // This event is for deleting a todo from the todo list
    socket.on('deleteTodo', todoIndex => {
      let todoList = this.state.todos;
      todoList.splice(todoIndex, 1);
      this.setState({ todos: todoList });
    });

    // This event is for receiving an error when client tries to add duplicate todo
    socket.on('receiveError', error => {
      this.setState({ error: error });
    });
  }

  render() {
    const { todos, error } = this.state;
    return (
      <div className={styles.container}>
        <TodoList todos={todos} />
        <NewTodoForm error={error} />
      </div>
    );
  }
}

export default App;
