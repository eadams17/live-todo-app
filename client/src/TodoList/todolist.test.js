import React from "react";
import { shallow } from "enzyme";
import TodoList from "./index.js";
import Todo from "../Todo";
const uuidv4 = require("uuid/v4");

const mockProps = {
  todos: [
    { uuid: uuidv4(), title: "test1", completed: false },
    { uuid: uuidv4(), title: "test2", completed: false },
    { uuid: uuidv4(), title: "test3", completed: false }
  ]
};
const component = shallow(<TodoList {...mockProps} />);
const e = { preventDefault: jest.fn() };

describe("Todo", () => {
  it("renders a Todo component for todo, passing todo as prop", () => {
    const todoPropCheck = i =>
      component
        .find(Todo)
        .at(i)
        .props().todo;
    expect(component.find(Todo).length).toEqual(3);
    expect(todoPropCheck(0)).toEqual(mockProps.todos[0]);
    expect(todoPropCheck(1)).toEqual(mockProps.todos[1]);
    expect(todoPropCheck(2)).toEqual(mockProps.todos[2]);
  });
  it("clicking Toggle All button calls updateAllTodos", () => {
    const spyUpdateAllTodos = jest.spyOn(
      component.instance(),
      "updateAllTodos"
    );
    component
      .find("button")
      .first()
      .props()
      .onClick(e);
    expect(spyUpdateAllTodos).toHaveBeenCalled();
  });
  it("clicking Delete All button calls deleteAllTodos", () => {
    const spyDeleteAllTodos = jest.spyOn(
      component.instance(),
      "deleteAllTodos"
    );
    component
      .find("button")
      .last()
      .props()
      .onClick(e);
    expect(spyDeleteAllTodos).toHaveBeenCalled();
  });
});
