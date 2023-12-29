import React, { memo } from "react";
import Todo from "./todo-item";
import "../styles/todo-list.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { hashString } from "../utils/helper";

const TodoList = memo((props) => {
  const { listTodos, setListTodos } = props;

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = reorderList(
      listTodos,
      result.source.index,
      result.destination.index
    );
    setListTodos(items);
  };

  const reorderList = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging ? "#eee" : "#fff",
    ...draggableStyle,
  });

  return (
    <section className="main">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="todo-list"
            >
              {listTodos.map((todo, index) => (
                <Draggable
                  key={`${index}_${hashString(todo.title)}`}
                  draggableId={`${index}_${hashString(todo.title)}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      className="task"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <Todo
                        index={index}
                        key={todo.id}
                        todo={todo}
                        {...props}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
});

export default TodoList;

// <ul className="todo-list">
//   {listTodos.map((todo, index) => (
//     <Todo index={index} key={todo.id} todo={todo} {...props} />
//   ))}
// </ul>;
