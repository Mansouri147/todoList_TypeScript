import React, { useEffect, useState, FC } from "react";
import ContentEditable from "react-contenteditable";

export interface Todo {
  completed: boolean;
  content: string;
  id: number;
}

interface ListProps {
  setTodoList: (todos: Todo[]) => void;
  todoList: Todo[];
  filterBy: string;
}

const List = ({ setTodoList, todoList, filterBy }: ListProps) => {
  const [filteredList, setFilteredList] = useState<Todo[]>([]);
  const deleteItem = (del) => {
    setTodoList(todoList.filter((value: Todo) => value.id != del));
  };

  useEffect(() => {
    filteredListHandler();
  }, [todoList, filterBy]);

  const filteredListHandler = (): void => {
    switch (filterBy) {
      case "completed":
        setFilteredList(todoList.filter((todo: Todo) => todo.completed));
        break;
      case "uncompleted":
        setFilteredList(todoList.filter((todo: Todo) => !todo.completed));
        break;
      default:
        setFilteredList(todoList);
        break;
    }
  };

  const reverseCompleted = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: Todo,
    arr: Todo[]
  ): void => {
    let newList = arr.map((el) =>
      el.id === item.id ? { ...el, completed: !item.completed } : el
    );
    setTodoList(newList);
  };

  const editableHandler = (e, arr, item): void => {
    let newList = arr.map((el) =>
      el.id === item.id ? { ...el, content: e.target.value } : el
    );
    setFilteredList(newList);
  };
  return (
    
    <div>
      {filteredList.map((item: Todo, i: number, arr: Todo[]) => (
        <div key={i}>
          <ContentEditable
            style={{
              textDecoration: item.completed && "line-through",
              opacity: item.completed && 0.5,
            }}
            className={`todoItem ${item.completed ? "completed" : ""}`}
            html={item.content}
            onChange={(e) => editableHandler(e, arr, item)}
          />
          <button onClick={() => deleteItem(item.id)}>Delete</button>
          <button onClick={(e) => reverseCompleted(e, item, arr)}>
            {item.completed ? "unCompleted" : "Completed"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default List;
