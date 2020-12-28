import React, { FC } from "react";

interface FormProps {
  input: string;
  setInput: (input: string) => void;
  addTodoItem: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Form: React.FC<FormProps> = ({ input, setInput, addTodoItem }) => {
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
        <button onClick={addTodoItem}>set todo</button>
      </form>
    </div>
  );
};
export default Form;
