import React, { useEffect, useState, FC } from "react";
import ContentEditable from "react-contenteditable";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
      el.id == item.id ? { ...el, completed: !item.completed } : el
    );
    setTodoList(newList);
  };

  const editableHandler = (e, arr, item): void => {
    let newList = arr.map((el) =>
      el.id == item.id ? { ...el, content: e.target.value } : el
    );
    setFilteredList(newList);
  };

  function handleOnDragEnd(result) {
    console.log(result)
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}t>
      <Droppable droppableId="list">
        {(provided) => (
          <div
            className="list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {filteredList.map((item: Todo, i: number, arr: Todo[]) => (
              <Draggable key={item.id} draggableId={`${item.id}`} index={i}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <ContentEditable
                      style={{
                        textDecoration: item.completed && "line-through",
                        opacity: item.completed && 0.5,
                      }}
                      className={`todoItem ${
                        item.completed ? "completed" : ""
                      }`}
                      html={item.content}
                      onChange={(e) => editableHandler(e, arr, item)}
                    />
                    <button onClick={() => deleteItem(item.id)}>Delete</button>
                    <button onClick={(e) => reverseCompleted(e, item, arr)}>
                      {item.completed ? "unCompleted" : "Completed"}
                    </button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default List;
