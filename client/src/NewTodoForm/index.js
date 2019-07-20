import React, { Component } from 'react';
import socket from '../socket.js';
import styles from './style.module.css';

class NewTodoForm extends Component {
  state = { newTodo: '' };

  componentDidUpdate() {
    this.inputField.focus();
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleSubmit(e);
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { newTodo } = this.state;
    // Send request to the server to make a new Todo
    socket.emit('make', {
      title: newTodo
    });
    this.setState({ newTodo: '' });
  };

  updateNewTodo = value => {
    this.setState({ newTodo: value });
  };

  render() {
    const { newTodo } = this.state;
    const { error } = this.props;
    return (
      <div className={styles.container}>
        <form
          onSubmit={e => this.handleSubmit(e)}
          onKeyPress={e => this.handleKeyPress(e)}
          className={styles.form}
        >
          <div className={styles.submitContainer}>
            <input
              className={styles.input}
              type="text"
              placeholder="i.e. bring back disco"
              onChange={e => this.setState({ newTodo: e.target.value })}
              value={newTodo}
              ref={inputField => (this.inputField = inputField)}
            />
            <button type="submit" className={styles.button}>
              Add
            </button>
          </div>
          {error && <div className={styles.error}>{error}</div>}
        </form>
      </div>
    );
  }
}

export default NewTodoForm;
