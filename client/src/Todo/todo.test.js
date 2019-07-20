import React from "react";
import { shallow } from "enzyme";
import Todo from "./index.js";
const uuidv4 = require("uuid/v4");

const mockProps = {
  todo: { uuid: uuidv4(), title: "test1", completed: false }
};
const component = shallow(<Todo {...mockProps} />);
const e = { preventDefault: jest.fn() };

describe("Todo", () => {
  it("completed todo has checked status and linethrough", () => {
    expect(
      component
        .find("div")
        .at(1)
        .props().style
    ).toEqual({});
    expect(component.find("input").props().checked).toBeFalsy();
    component.setProps({
      todo: { uuid: uuidv4(), title: "test1", completed: true }
    });
    expect(component.find("input").props().checked).toBeTruthy();
    expect(
      component
        .find("div")
        .at(1)
        .props().style
    ).toEqual({ textDecoration: "line-through" });
  });
  it("clicking check box calls updateTodos", () => {
    const spyUpdateTodo = jest.spyOn(component.instance(), "updateTodo");
    component
      .find("input")
      .first()
      .props()
      .onChange(e);
    expect(spyUpdateTodo).toHaveBeenCalled();
  });
  it("clicking delete button calls updateTodos", () => {
    const spyDeleteTodo = jest.spyOn(component.instance(), "deleteTodo");
    component
      .find("button")
      .last()
      .props()
      .onClick(e);
    expect(spyDeleteTodo).toHaveBeenCalled();
  });
});
