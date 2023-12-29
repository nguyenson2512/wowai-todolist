import React, { memo } from "react";
import { modalService } from "../services/modal";
import TodoForm from "./todo-form";

const Todo = memo((props) => {
  const { todo, markCompleted, editTodo, index, removeTodo } = props;

  const showEditForm = () => {
    modalService.showModal({
      title: "Edit Todo",
      content: "Update title and description:",
      onOk: handleOk,
      onClose: handleClose,
      component: <TodoForm isCreate={false} todo={todo} />,
    });
  };

  const handleOk = ({ title, description }) => {
    editTodo(
      {
        ...todo,
        title,
        description,
      },
      index
    );
    handleClose();
  };

  const handleClose = () => {
    modalService.destroy();
  };

  return (
    <li className={`${todo.isCompleted ? "completed" : ""}`}>
      {
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => markCompleted(todo.id)}
          />
          <label onDoubleClick={() => showEditForm()}>
            {todo.title}
            <br />
            <span className="description">{todo.description}</span>
          </label>
          <button className="destroy" onClick={() => removeTodo(todo.id)} />
        </div>
      }
    </li>
  );
});

export default Todo;
