import React from 'react';
import { mount } from 'enzyme';
import NewTodo from './index.js';

const mockProps = {
  error: ''
};
const component = mount(<NewTodo {...mockProps} />);
const e = { preventDefault: jest.fn() };

describe('NewTodo', () => {
  it('typing in input updates newTodo piece of state', () => {
    const e = { target: { value: 'Order more coffee' } };
    component
      .find('input')
      .first()
      .props()
      .onChange(e);
    expect(component.state().newTodo).toEqual('Order more coffee');
  });
  it('clicking button or hitting Enter calls handleSubmit', () => {
    const spyHandleSubmit = jest.spyOn(component.instance(), 'handleSubmit');
    component
      .find('i')
      .props()
      .onClick(e);
    expect(spyHandleSubmit).toHaveBeenCalled();
    component.find('form').simulate('keypress', { key: 'Enter' });
    expect(spyHandleSubmit).toHaveBeenCalled();
  });
});
