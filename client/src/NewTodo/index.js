import React, { Component } from "react";
import socket from "../socket.js";
import styles from "./style.module.css";

export class NewTodo extends Component {
  state = { newTodo: "" };

  componentDidUpdate() {
    this.inputField.focus();
  }

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.handleSubmit(e);
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { newTodo } = this.state;
    // Send request to the server to make a new Todo
    socket.emit("make", {
      title: newTodo
    });
    this.setState({ newTodo: "" });
  };

  render() {
    const { newTodo } = this.state;
    const { error } = this.props;
    return (
      <div className={styles.container}>
        <form onKeyPress={e => this.handleKeyPress(e)} className={styles.form}>
          <div className={styles.submitContainer}>
            <input
              className={styles.input}
              type="text"
              placeholder="i.e. bring back disco"
              onChange={e => this.setState({ newTodo: e.target.value })}
              value={newTodo}
              ref={inputField => (this.inputField = inputField)}
            />
            <button
              type="submit"
              className={styles.button}
              onClick={e => this.handleSubmit(e)}
            >
              Add
            </button>
          </div>
          {error && <div className={styles.error}>{error}</div>}
        </form>
      </div>
    );
  }
}

export default NewTodo;
