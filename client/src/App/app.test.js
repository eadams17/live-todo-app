import React from 'react';
import { shallow } from 'enzyme';
import App from './index.js';
import TodoList from '../TodoList';
import NewTodo from '../NewTodo';
const uuidv4 = require('uuid/v4');

describe('App', () => {
  it('renders TodoList and NewTodo components, passing expected props', () => {
    const component = shallow(<App />);
    const uuids = [uuidv4(), uuidv4(), uuidv4()];
    component.setState({
      todos: {
        [uuids[0]]: {
          title: 'Beba a saidera',
          completed: false
        },
        [uuids[1]]: {
          title: 'Desligue a luz',
          completed: false
        },
        [uuids[2]]: {
          title: 'Curte a vida',
          completed: false
        }
      },
      error: 'O Todo já existe!'
    });
    expect(component.find(TodoList).length).toEqual(1);
    expect(component.find(NewTodo).length).toEqual(1);
    expect(component.find(TodoList).props().todos).toEqual(
      component.state().todos
    );
    expect(component.find(NewTodo).props().error).toEqual(
      component.state().error
    );
  });
});
