import React from 'react';
import { shallow } from 'enzyme';
import TodoList from './index.js';
import Todo from '../Todo';
const uuidv4 = require('uuid/v4');

const uuids = [uuidv4(), uuidv4(), uuidv4()];
const mockProps = {
  todos: {
    [uuids[0]]: {
      title: 'test1',
      completed: false
    },
    [uuids[1]]: {
      title: 'test2',
      completed: false
    },
    [uuids[2]]: {
      title: 'test3',
      completed: false
    }
  }
};
const component = shallow(<TodoList {...mockProps} />);

describe('TodoList', () => {
  it('renders a Todo component for todo, passing todo as prop', () => {
    const todoPropCheck = i =>
      component
        .find(Todo)
        .at(i)
        .props().todo;
    expect(component.find(Todo).length).toEqual(3);
    expect(todoPropCheck(0)).toEqual(mockProps.todos[uuids[0]]);
    expect(todoPropCheck(1)).toEqual(mockProps.todos[uuids[1]]);
    expect(todoPropCheck(2)).toEqual(mockProps.todos[uuids[2]]);
  });
});
