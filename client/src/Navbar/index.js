import React, { Component } from 'react';
import socket from '../socket';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from './style.module.css';

export class Navbar extends Component {
  updateAllTodos(e) {
    e.preventDefault();
    // Send request to the server to update all todos
    socket.emit('updateAll');
  }

  deleteAllTodos = e => {
    e.preventDefault();
    // Send request to the server to delete all todos
    socket.emit('deleteAll');
  };

  render() {
    const { todos, analytics, connected } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div className={styles.header}>Task List</div>
          <div>
            {!connected && <i id={styles.x} className="fas fa-times" />}
            <i
              id={connected ? styles.online : styles.offline}
              className="fas fa-signal"
            />
          </div>
        </div>
        <div className={styles.date}>{moment().format('dddd, MMMM Do')}</div>
        <div className={styles.analyticsContainer}>
          <div className={styles.analytic}>
            <div className={styles.total}>{Object.keys(todos).length}</div>
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
            className={styles.toggleButton}
            onClick={e => this.updateAllTodos(e)}
          >
            Toggle All
          </button>
          <button
            className={styles.deleteButton}
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
  todos: PropTypes.object.isRequired,
  analytics: PropTypes.array.isRequired
};

export default Navbar;
