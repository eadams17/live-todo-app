import React from 'react';
import { shallow } from 'enzyme';
import Navbar from './index.js';
const uuidv4 = require('uuid/v4');

const mockProps = {
  todos: [
    { uuid: uuidv4(), title: 'test1', completed: false },
    { uuid: uuidv4(), title: 'test2', completed: false },
    { uuid: uuidv4(), title: 'test3', completed: false }
  ],
  analytics: [0, 3],
  connected: true
};
const component = shallow(<Navbar {...mockProps} />);
const e = { preventDefault: jest.fn() };

describe('Navbar', () => {
  it('clicking Toggle All button calls updateAllTodos', () => {
    const spyUpdateAllTodos = jest.spyOn(
      component.instance(),
      'updateAllTodos'
    );
    component
      .find('button')
      .first()
      .props()
      .onClick(e);
    expect(spyUpdateAllTodos).toHaveBeenCalled();
  });
  it('clicking Delete All button calls deleteAllTodos', () => {
    const spyDeleteAllTodos = jest.spyOn(
      component.instance(),
      'deleteAllTodos'
    );
    component
      .find('button')
      .last()
      .props()
      .onClick(e);
    expect(spyDeleteAllTodos).toHaveBeenCalled();
  });
});
