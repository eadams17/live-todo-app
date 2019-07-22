import React from 'react';
import { shallow } from 'enzyme';
import Todo from './index.js';
const uuidv4 = require('uuid/v4');

const mockProps = {
  todo: { uuid: uuidv4(), title: 'test1', completed: false }
};
const component = shallow(<Todo {...mockProps} />);
const e = { preventDefault: jest.fn() };

describe('Todo', () => {
  it('completed todo has checked status and linethrough', () => {
    expect(
      component
        .find('div')
        .at(2)
        .props().className
    ).toEqual('todo');
    expect(
      component
        .find('i')
        .first()
        .props().id
    ).toEqual('unchecked');
    component.setProps({
      todo: { uuid: uuidv4(), title: 'test1', completed: true }
    });
    expect(
      component
        .find('i')
        .first()
        .props().id
    ).toEqual('checked');
    expect(
      component
        .find('div')
        .at(2)
        .props().className
    ).toEqual('todoCrossed');
  });
  it('clicking check box calls updateTodo', () => {
    const spyUpdateTodo = jest.spyOn(component.instance(), 'updateTodo');
    component
      .find('div')
      .at(1)
      .props()
      .onClick(e);
    expect(spyUpdateTodo).toHaveBeenCalled();
  });
  it('clicking delete button calls deleteTodo', () => {
    const spyDeleteTodo = jest.spyOn(component.instance(), 'deleteTodo');
    component
      .find('i')
      .last()
      .props()
      .onClick(e);
    expect(spyDeleteTodo).toHaveBeenCalled();
  });
});
