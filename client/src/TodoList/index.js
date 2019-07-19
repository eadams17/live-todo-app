import React, { Component } from 'react';
import socket from '../socket';
import styles from './style.module.css';

class TodoList extends Component {
  handleUpdate(e, todo) {
    e.preventDefault();
    // Send request to the server to update completion status of todo
    socket.emit('update', todo);
  }

  handleDelete(e, todo) {
    e.preventDefault();
    // Send request to the server to delete a todo
    socket.emit('delete', todo);
  }

  render() {
    const { todos } = this.props;
    return (
      <div className={styles.container}>
        {todos &&
          todos.map((todo, i) => {
            const completed = todo.completed;
            return (
              <div key={i} className={styles.todoContainer}>
                <input
                  className={styles.checkBox}
                  type="checkbox"
                  onChange={e => this.handleUpdate(e, todo)}
                  checked={completed}
                />
                <div
                  className={styles.todoTitle}
                  style={completed ? { textDecoration: 'line-through' } : {}}
                >
                  {todo.title}
                </div>
                <button
                  className={styles.button}
                  onClick={e => this.handleDelete(e, todo)}
                >
                  X
                </button>
              </div>
            );
          })}
      </div>
    );
  }
}

export default TodoList;
