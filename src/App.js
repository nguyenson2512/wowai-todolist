import React, { useState, useEffect } from "react";
import TodoList from "./components/todo-list";
import Header from "./components/header";
import Footer from "./components/footer";
import "./App.css";
import { filterByStatus, filterTodosLeft } from "./utils/helper";
import { TODO_STATUS, STORAGE_KEY } from "./utils/const";
import { modalService } from "./services/modal";
import { localStorageService } from "./services/local-storage";

const App = () => {
  const [listTodos, setListTodos] = useState(
    JSON.parse(localStorageService.get(STORAGE_KEY.LIST)) || []
  );
  const [status, setStatus] = useState(
    JSON.parse(localStorageService.get(STORAGE_KEY.LIST)) || "ALL"
  );

  useEffect(() => {
    // Persist the tasks locally
    localStorageService.set(STORAGE_KEY.LIST, JSON.stringify(listTodos));
    localStorageService.set(STORAGE_KEY.STATUS, JSON.stringify(status));
  }, [listTodos, status]);

  const addTodo = (todo = {}) => {
    setListTodos((prevListTodos) => [...prevListTodos, todo]);
  };

  const markCompleted = (id = "") => {
    const updatedListTodos = listTodos.map((item) => {
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted };
      }
      return item;
    });
    setListTodos(updatedListTodos);
  };

  const clearCompleted = () => {
    setListTodos((prevListTodos) => filterTodosLeft(prevListTodos));
  };

  const editTodo = (todo, index) => {
    setListTodos((prevListTodos) => {
      const newListTodos = [...prevListTodos];
      newListTodos.splice(index, 1, todo);
      return newListTodos;
    });
  };

  const removeTodo = (id = "") => {
    modalService.confirm({
      title: "Confirm Modal",
      content: "Are you sure to remove this item?",
      onOk: () => {
        setListTodos((prevListTodos) =>
          filterByStatus(prevListTodos, TODO_STATUS.REMOVE, id)
        );
      },
      onClose: () => {},
    });
  };

  return (
    <div className="todoapp">
      <Header addTodo={addTodo} />
      <TodoList
        listTodos={filterByStatus(listTodos, status)}
        markCompleted={markCompleted}
        editTodo={editTodo}
        removeTodo={removeTodo}
        setListTodos={setListTodos}
      />
      <Footer
        activeButton={status}
        setStatusFilter={(newStatus) => setStatus(newStatus)}
        clearCompleted={clearCompleted}
        numOfTodosLeft={filterTodosLeft(listTodos).length}
        numOfTodos={listTodos.length}
      />
    </div>
  );
};

export default App;
