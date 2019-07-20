import React from "react";
import { mount } from "enzyme";
import NewTodo from "./index.js";

const mockProps = {
  error: ""
};
const component = mount(<NewTodo {...mockProps} />);
const e = { preventDefault: jest.fn() };

describe("NewTodo", () => {
  it("typing in input updates newTodo piece of state", () => {
    const e = { target: { value: "bacana" } };
    component
      .find("input")
      .first()
      .props()
      .onChange(e);
    expect(component.state().newTodo).toEqual("bacana");
  });
  it("clicking button calls handleSubmit", () => {
    const spyHandleSubmit = jest.spyOn(component.instance(), "handleSubmit");
    component
      .find("button")
      .first()
      .props()
      .onClick(e);
    expect(spyHandleSubmit).toHaveBeenCalled();
  });
  it("pressing Enter key calls handleSubmit", () => {
    const spyHandleSubmit = jest.spyOn(component.instance(), "handleSubmit");
    component.find("form").simulate("keypress", { key: "Enter" });
    expect(spyHandleSubmit).toHaveBeenCalled();
  });
});
