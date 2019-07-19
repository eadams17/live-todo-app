import React, { Component } from 'react';
import socket from '../socket.js';

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
    if (newTodo) {
      // Send request to the server to make a new Todo
      socket.emit('make', {
        title: newTodo
      });
      this.setState({ newTodo: '' });
    }
  };

  updateNewTodo = value => {
    this.setState({ newTodo: value });
  };

  render() {
    const { newTodo } = this.state;
    return (
      <div className="container">
        <form
          onSubmit={e => this.handleSubmit(e)}
          onKeyPress={e => this.handleKeyPress(e)}
          className="form"
        >
          <input
            className="input"
            type="text"
            onChange={e => this.setState({ newTodo: e.target.value })}
            value={newTodo}
            ref={inputField => (this.inputField = inputField)}
          />
          <button type="submit" className="button">
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default NewTodoForm;
