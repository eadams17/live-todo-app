import React, { Component } from "react";
import TodoList from "../TodoList";
import NewTodo from "../NewTodo";
import socket from "../socket.js";
import styles from "./style.module.css";

export class App extends Component {
  state = { todos: [], error: "", connected: false };

  componentDidMount() {
    // This event is for loading the initial list of todos
    socket.on("load", todos => {
      this.setState({ todos: todos, connected: true });
    });

    // This event is for adding the newly created todo to the todo list
    socket.on("addTodo", todo => {
      this.setState({
        todos: [...this.state.todos, todo],
        error: ""
      });
    });

    // This event is for toggling the completion status of a todo
    socket.on("updateTodo", newTodo => {
      let todoList = this.state.todos;
      const index = todoList.findIndex(todo => todo.uuid === newTodo.uuid);
      todoList[index] = newTodo;
      this.setState({
        todos: todoList
      });
    });

    // This event is for deleting a todo from the todo list
    socket.on("deleteTodo", todoIndex => {
      let todoList = this.state.todos;
      todoList.splice(todoIndex, 1);
      this.setState({
        todos: todoList
      });
    });

    // This event is for receiving an error when client tries to add duplicate todo
    socket.on("receiveError", error => {
      this.setState({
        error: error
      });
    });

    // This event is for detecting a failed connection and caching todo list
    socket.on("connect_error", error => {
      const todos = JSON.parse(localStorage.getItem("todos"));
      this.setState({ todos: todos, connected: false });
    });
  }

  componentDidUpdate() {
    // Store todos in browser in case of server disconnect
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  }

  render() {
    const { todos, error, connected } = this.state;
    return (
      <div className={styles.container}>
        <div>{connected ? "online" : "offline"}</div>
        <TodoList todos={todos} />
        <NewTodo error={error} />
      </div>
    );
  }
}

export default App;
