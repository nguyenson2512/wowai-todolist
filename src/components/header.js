import React, { memo } from "react";
import { Button, Flex } from "antd";
import { modalService } from "../services/modal";
import TodoForm from "./todo-form";

const Header = memo(({ addTodo }) => {
  const showAddNewForm = () => {
    modalService.showModal({
      title: "Add Todo",
      content: "Enter title and description:",
      onOk: handleOk,
      onClose: handleClose,
      component: <TodoForm isCreate={true} />,
    });
  };

  const handleOk = ({ title, description }) => {
    addTodo({
      id: new Date().valueOf(),
      title,
      description,
      isCompleted: false,
    });
    handleClose();
  };

  const handleClose = () => {
    modalService.destroy();
  };

  return (
    <header className="header">
      <h1>Todo List</h1>
      <Flex justify={"flex-end"}>
        <Button type="primary" onClick={showAddNewForm} style={{ margin: 10 }}>
          Add Todo
        </Button>
      </Flex>
    </header>
  );
});

export default Header;
