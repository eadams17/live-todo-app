import React, { Component } from 'react';
import Todo from '../Todo';
import PropTypes from 'prop-types';
import styles from './style.module.css';

export class TodoList extends Component {
  render() {
    const { todos } = this.props;
    return (
      <div className={styles.container}>
        {todos.length !== 0 &&
          todos.map((todo, i) => {
            return <Todo key={i} todo={todo} />;
          })}
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired
};

export default TodoList;
