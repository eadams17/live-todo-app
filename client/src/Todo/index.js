import React, { Component } from "react";
import socket from "../socket";
import styles from "./style.module.css";

class Todo extends Component {
  updateTodo(e, todo) {
    e.preventDefault();
    // Send request to the server to update completion status of todo
    socket.emit("update", todo);
  }

  deleteTodo = (e, todo) => {
    e.preventDefault();
    // Send request to the server to delete a todo
    socket.emit("delete", todo);
  };

  render() {
    const { todo } = this.props;
    const completed = todo.completed;
    return (
      <div className={styles.todoContainer}>
        <input
          className={styles.checkBox}
          type="checkbox"
          onChange={e => this.updateTodo(e, todo)}
          checked={completed}
        />
        <div
          className={styles.todoTitle}
          style={completed ? { textDecoration: "line-through" } : {}}
        >
          {todo.title}
        </div>
        <button
          className={styles.button}
          onClick={e => this.deleteTodo(e, todo)}
        >
          X
        </button>
      </div>
    );
  }
}

export default Todo;
