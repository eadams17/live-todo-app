import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
const socket = socketIOClient('http://localhost:3003/');

class App extends Component {
  state = { todos: [], newTodo: '' };

  componentDidMount() {
    // This event is for loading the entire list of todos from the server
    socket.on('load', todos => {
      this.setState({ todos: todos });
    });
    // This event is for adding the newly created todo to the list stored in state
    socket.on('addTodo', todo => {
      this.setState({
        todos: [...this.state.todos, todo]
      });
    });
  }

  componentDidUpdate() {
    this.inputField.focus();
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSubmit(e);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { newTodo } = this.state;
    if (newTodo) {
      // Send request to the server to make a new Todo
      socket.emit('make', {
        title: newTodo
      });
      this.setState({ newTodo: '' });
    }
  }

  render() {
    const { todos, newTodo } = this.state;
    return (
      <div className="container">
        {todos &&
          todos.map((todo, i) => {
            return <div key={i}>{todo.title}</div>;
          })}
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

export default App;
