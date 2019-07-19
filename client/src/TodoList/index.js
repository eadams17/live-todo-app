import React, { Component } from 'react';
import socket from '../socket';

class TodoList extends Component {
  handleClick(e, todo) {
    e.preventDefault();
    // Send request to the server to update completion status of todo
    socket.emit('update', todo);
  }
  render() {
    const { todos } = this.props;
    return (
      <div className="container">
        {todos &&
          todos.map((todo, i) => {
            return (
              <div key={i} className="todo-container">
                <div className="todo-title">{todo.title}</div>
                <div className="completion-toggle-container">
                  <div className="completion-status">
                    {todo.completed ? 'completed' : 'uncomplete'}
                  </div>
                  <button
                    className="button"
                    onClick={e => this.handleClick(e, todo)}
                  >
                    update
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

export default TodoList;
