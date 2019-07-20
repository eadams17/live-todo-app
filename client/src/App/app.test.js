import React from "react";
import { shallow } from "enzyme";
import App from "./index.js";
import TodoList from "../TodoList";
import NewTodo from "../NewTodo";

describe("App", () => {
  it("renders TodoList and NewTodo components, passing expected props", () => {
    const component = shallow(<App />);
    component.setState({
      todos: ["ligue a luz", "beba a saidera"],
      error: "Todo já existe!"
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
