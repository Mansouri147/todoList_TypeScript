import { observer } from "mobx-react";
import React, { FC, useState } from "react";
import todoStore, { Todo } from "../../context/todoStore";

interface FormProps {
  originalTodo: Todo | null;
}

const Form = observer(({ originalTodo }: FormProps) => {
  const [input, setInput] = useState<string>(originalTodo?.content || "");
  function handleSubmit(e) {
    e.preventDefault();
    if (originalTodo === null) {
      todoStore.addTodoItem({ completed: false, content: input });
    } else {
      todoStore.updateItem({
        ...originalTodo,
        content: input,
      });
    }
  }
  return (
    <div>
      <form action="">
        <label>todos</label>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="what needs to be done"
          type="text"
        />
        <button onClick={handleSubmit}>set todo</button>
      </form>
    </div>
  );
});
export default Form;
