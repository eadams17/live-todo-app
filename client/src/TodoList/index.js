import React, { Component } from "react";
import socket from "../socket";
import Todo from "../Todo";
import styles from "./style.module.css";

export class TodoList extends Component {
  updateAllTodos(e) {
    e.preventDefault();
    // Send request to the server to delete a todo
    socket.emit("updateAll");
  }

  deleteAllTodos = e => {
    e.preventDefault();
    // Send request to the server to delete a todo
    socket.emit("deleteAll");
  };

  render() {
    const { todos } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            onClick={e => this.updateAllTodos(e)}
          >
            Toggle All
          </button>
          <button
            className={styles.button}
            onClick={e => this.deleteAllTodos(e)}
          >
            Delete All
          </button>
        </div>
        {todos.length !== 0 &&
          todos.map((todo, i) => {
            return <Todo key={i} todo={todo} />;
          })}
      </div>
    );
  }
}

export default TodoList;
