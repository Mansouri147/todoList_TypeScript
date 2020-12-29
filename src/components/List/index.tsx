import React, { useEffect, useState } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { observer } from "mobx-react";
import todoStore, { Todo } from "../../context/todoStore";

const List = observer(
  ({ filterBy }: { filterBy: "ALL" | "DONE" | "UNDONE" }) => {
    const [filteredList, setFilteredList] = useState<Todo[]>([]);
    useEffect(() => {
      switch (filterBy) {
        case "DONE":
          setFilteredList(
            todoStore.todoList.filter((todo: Todo) => todo.completed)
          );
          break;
        case "UNDONE":
          setFilteredList(
            todoStore.todoList.filter((todo: Todo) => !todo.completed)
          );
          break;
        default:
          setFilteredList(todoStore.todoList);
      }
    }, [todoStore.todoList, filterBy]);

    function handleOnDragEnd(result: any) {
      if (!result.destination) return;
      todoStore.swapOrder(
        filteredList[result.source.index].id,
        filteredList[result.destination.index].id
      );
    }
    function editableHandler(e: ContentEditableEvent, itemId: string) {
      const todo = filteredList.find((e) => e.id === itemId);
      if (todo) {
        todoStore.updateItem({
          ...todo,
          content: e.target.value,
        });
      }
    }
    function reverseCompleted(itemId: string) {
      const todo = filteredList.find((e) => e.id === itemId);
      if (todo) {
        todoStore.updateItem({
          ...todo,
          completed: !todo.completed,
        });
      }
    }

    return (
      <DragDropContext onDragEnd={handleOnDragEnd}>
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
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ContentEditable
                        style={{
                          textDecoration: item.completed && "line-through",
                          opacity: item.completed && 0.5,
                        }}
                        className={`todoItem ${
                          item.completed ? "completed" : ""
                        }`}
                        html={item.content}
                        onChange={(e) => editableHandler(e, item.id)}
                      />
                      <button onClick={() => todoStore.deleteItem(item.id)}>
                        Delete
                      </button>
                      <button onClick={(e) => reverseCompleted(item.id)}>
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
  }
);

export default List;
