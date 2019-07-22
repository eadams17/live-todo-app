import React, { Component } from 'react';
import TodoList from '../TodoList';
import NewTodo from '../NewTodo';
import Navbar from '../Navbar';
import socket from '../socket.js';
import styles from './style.module.css';

export class App extends Component {
  state = { todos: {}, error: '', connected: false };

  componentDidMount() {
    // This event is for loading the initial list of todos
    socket.on('load', todos => {
      this.setState({ todos: todos, connected: true });
    });

    // This event is for adding the newly created todo to the todo list
    socket.on('addTodo', todo => {
      let todos = this.state.todos;
      todos[todo.uuid] = todo;
      this.setState({ todos, error: '' });
    });

    // This event is for toggling the completion status of a todo
    socket.on('updateTodo', todo => {
      let todos = this.state.todos;
      todos[todo.uuid] = todo;
      this.setState({ todos });
    });

    // This event is for deleting a todo from the todo list
    socket.on('deleteTodo', uuid => {
      let todos = this.state.todos;
      delete todos[uuid];
      this.setState({ todos });
    });

    // This event is for receiving an error when client tries to add duplicate todo
    socket.on('receiveError', error => {
      this.setState({ error });
    });

    // This event is for detecting a failed connection and caching todo list
    socket.on('connect_error', error => {
      const todos = JSON.parse(localStorage.getItem('todos'));
      this.setState({ todos: todos, connected: false });
    });
  }

  componentDidUpdate() {
    // Store todos in browser in case of server disconnect
    localStorage.setItem('todos', JSON.stringify(this.state.todos));
  }

  getAnalytics() {
    // get complete/incomplete count for navbar analytics display
    const { todos } = this.state;
    let analytics = [0, 0];
    Object.keys(todos).forEach(uuid => {
      if (todos[uuid].completed) {
        analytics[0] += 1;
      } else {
        analytics[1] += 1;
      }
    });
    return analytics;
  }

  render() {
    const { todos, error, connected } = this.state;
    const analytics = todos && this.getAnalytics();
    return (
      <div className={styles.container}>
        <Navbar connected={connected} todos={todos} analytics={analytics} />
        <TodoList todos={todos} />
        <NewTodo error={error} />
      </div>
    );
  }
}

export default App;
