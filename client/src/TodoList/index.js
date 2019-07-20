import React, { Component } from 'react';
import socket from '../socket';
import styles from './style.module.css';

class TodoList extends Component {
  updateTodo(e, todo) {
    e.preventDefault();
    // Send request to the server to update completion status of todo
    socket.emit('update', todo);
  }

  updateAllTodos(e) {
    e.preventDefault();
    // Send request to the server to delete a todo
    socket.emit('updateAll');
  }

  deleteTodo(e, todo) {
    e.preventDefault();
    // Send request to the server to delete a todo
    socket.emit('delete', todo);
  }

  deleteAllTodos(e) {
    e.preventDefault();
    // Send request to the server to delete a todo
    socket.emit('deleteAll');
  }

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
            const completed = todo.completed;
            return (
              <div key={i} className={styles.todoContainer}>
                <input
                  className={styles.checkBox}
                  type="checkbox"
                  onChange={e => this.updateTodo(e, todo)}
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
                  onClick={e => this.deleteTodo(e, todo)}
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
