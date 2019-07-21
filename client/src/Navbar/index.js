import React, { Component } from 'react';
import socket from '../socket';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from './style.module.css';

export class Navbar extends Component {
  updateAllTodos(e) {
    e.preventDefault();
    // Send request to the server to delete a todo
    socket.emit('updateAll');
  }

  deleteAllTodos = e => {
    e.preventDefault();
    // Send request to the server to delete a todo
    socket.emit('deleteAll');
  };

  render() {
    const { todos, analytics, connected } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div className={styles.header}>Task List</div>
          <div className={styles.statusContainer}>
            <div className={styles.status}>
              {connected ? 'online' : 'offline'}
            </div>
            <div className={connected ? styles.online : styles.offline} />
          </div>
        </div>
        <div className={styles.date}>{moment().format('dddd, MMMM Do')}</div>
        <div className={styles.analyticsContainer}>
          <div className={styles.analytic}>
            <div className={styles.total}>{todos.length}</div>
            <div className={styles.label}>total</div>
          </div>
          <div className={styles.analytic}>
            <div className={styles.complete}>{analytics[0]}</div>
            <div className={styles.label}>complete</div>
          </div>
          <div className={styles.analytic}>
            <div className={styles.incomplete}>{analytics[1]}</div>
            <div className={styles.label}>incomplete</div>
          </div>
        </div>
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
      </div>
    );
  }
}

Navbar.propTypes = {
  connected: PropTypes.bool.isRequired,
  todos: PropTypes.array.isRequired,
  analytics: PropTypes.array.isRequired
};

export default Navbar;
