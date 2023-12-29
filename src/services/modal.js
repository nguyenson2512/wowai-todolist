import { Modal } from "antd";
import React from "react";

class ModalService {
  confirm({ title, content, onOk, onClose }) {
    Modal.confirm({
      title: title,
      content,
      onOk,
      onCancel: onClose,
    });
  }

  showModal({ title, content, onOk, onClose, component }) {
    return Modal.info({
      title: title,
      content: (
        <div>
          {content}
          {React.cloneElement(component, {
            onOk,
            onClose,
          })}
        </div>
      ),
      footer: null,
    });
  }

  destroy() {
    Modal.destroyAll();
  }
}

export const modalService = new ModalService();
