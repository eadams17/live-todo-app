import React from 'react';
import Todo from '../Todo';
import PropTypes from 'prop-types';
import styles from './style.module.css';

export const TodoList = ({ todos }) => {
  return (
    <div className={styles.container}>
      {todos.length !== 0 &&
        Object.keys(todos).map((uuid, i) => {
          return <Todo key={i} todo={todos[uuid]} />;
        })}
    </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default TodoList;
