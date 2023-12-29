import React, { memo } from "react";
import { TODO_STATUS } from "../utils/const";

const Footer = memo((props) => {
  const {
    setStatusFilter,
    activeButton,
    clearCompleted,
    numOfTodosLeft,
    numOfTodos,
  } = props;
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{numOfTodosLeft}</strong>
        <span> </span>
        <span>{numOfTodosLeft > 1 ? "items" : "item"}</span>
        <span> left</span>
      </span>
      <ul className="filters">
        <li>
          <a
            href="#/"
            className={`${activeButton === "ALL" ? "selected" : ""}`}
            onClick={() => setStatusFilter("ALL")}
          >
            All
          </a>
        </li>
        <span></span>
        <li>
          <a
            href="#/active"
            className={`${
              activeButton === TODO_STATUS.PENDING ? "selected" : ""
            }`}
            onClick={() => setStatusFilter(TODO_STATUS.PENDING)}
          >
            Pending
          </a>
        </li>
        <span></span>
        <li>
          <a
            href="#/completed"
            className={`${
              activeButton === TODO_STATUS.COMPLETED ? "selected" : ""
            }`}
            onClick={() => setStatusFilter(TODO_STATUS.COMPLETED)}
          >
            Completed
          </a>
        </li>
      </ul>
      {numOfTodosLeft < numOfTodos && (
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      )}
    </footer>
  );
});

export default Footer;
