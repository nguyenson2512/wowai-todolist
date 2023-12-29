import React from "react";
import { Form, Input, Button, Space } from "antd";

const TodoForm = ({ onOk, onClose, isCreate, todo }) => {
  const onFinish = (values) => {
    onOk(values);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 20,
      }}
      style={{
        maxWidth: 800,
        marginTop: "1rem",
      }}
      initialValues={!isCreate ? todo : {}}
      onFinish={onFinish}
      labelAlign="left"
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please input your title!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please input your description!" }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 20,
          offset: 6,
        }}
      >
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button type="default" onClick={onClose}>
            Cancel
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default TodoForm;
