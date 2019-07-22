import React, { Component } from 'react';
import socket from '../socket.js';
import PropTypes from 'prop-types';
import styles from './style.module.css';

export class NewTodo extends Component {
  state = { newTodo: '' };

  handleSubmit = e => {
    e.preventDefault();
    const { newTodo } = this.state;
    // Send request to the server to make a new Todo
    socket.emit('make', {
      title: newTodo
    });
    this.setState({ newTodo: '' });
  };

  render() {
    const { newTodo } = this.state;
    const { error } = this.props;
    return (
      <div className={styles.container}>
        <form onKeyPress={e => e.key === 'Enter' && this.handleSubmit(e)}>
          <div className={styles.submitContainer}>
            <div className={styles.subContainer}>
              <input
                className={styles.input}
                type="text"
                placeholder="i.e. bring back disco"
                onChange={e => this.setState({ newTodo: e.target.value })}
                value={newTodo}
                ref={inputField => (this.inputField = inputField)}
              />
              <button
                className={styles.button}
                onClick={e => this.handleSubmit(e)}
              >
                Create
              </button>
            </div>
            <div className={styles.error}>{error}</div>
          </div>
        </form>
      </div>
    );
  }
}

NewTodo.propTypes = {
  error: PropTypes.string
};

export default NewTodo;
