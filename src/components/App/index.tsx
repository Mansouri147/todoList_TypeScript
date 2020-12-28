import React, { useState, FC } from "react";
import Form from "../Form";
import List, { Todo } from "../List";

const App: React.FC = () => {
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<string>("");

  const addTodoItem = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    if (input) {
      const newTodoItem = {
        content: input,
        id: Math.random() * 1000,
        completed: false,
      };
      console.log(todoList);
      setTodoList([...todoList, newTodoItem]);
    }
    setInput("");
  };

  return (
    <div>
      <Form input={input} addTodoItem={addTodoItem} setInput={setInput} />
      <select
        name=""
        id=""
        value={filterBy}
        onChange={(e) => {
          setFilterBy(e.target.value);
        }}
      >
        <option value="all">All</option>
        <option value="uncompleted">Uncompleted</option>
        <option value="completed">Completed</option>
      </select>
      <List filterBy={filterBy} todoList={todoList} setTodoList={setTodoList} />
    </div>
  );
};

export default App;
