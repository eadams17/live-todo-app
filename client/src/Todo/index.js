import React, { Component } from 'react';
import socket from '../socket';
import PropTypes from 'prop-types';
import styles from './style.module.css';

class Todo extends Component {
  updateTodo(e, todo) {
    e.preventDefault();
    // Send request to the server to update completion status of todo
    socket.emit('update', todo);
  }

  deleteTodo = (e, uuid) => {
    e.preventDefault();
    // Send request to the server to delete a todo
    socket.emit('delete', uuid);
  };

  render() {
    const { todo } = this.props;
    const uuid = todo.uuid;
    const completed = todo.completed;
    return (
      <div className={styles.container}>
        <div
          tabIndex="0"
          onClick={e => this.updateTodo(e, todo)}
          onKeyPress={e => e.key === 'Enter' && this.updateTodo(e, todo)}
          className={styles.checkBox}
        >
          <i
            id={completed ? styles.checked : styles.unchecked}
            className="fas fa-check fa-xs"
          />
        </div>
        <div className={completed ? styles.todoCrossed : styles.todo}>
          {todo.title}
        </div>
        <i
          tabIndex="0"
          id={styles.closeIcon}
          className="fa fa-trash-alt fa-1x"
          onKeyPress={e => e.key === 'Enter' && this.deleteTodo(e, uuid)}
          onClick={e => this.deleteTodo(e, uuid)}
        />
      </div>
    );
  }
}

Todo.propTypes = {
  todo: PropTypes.object.isRequired
};

export default Todo;
