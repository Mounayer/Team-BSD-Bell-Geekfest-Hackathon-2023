import React from 'react';
import Form from '../form';

function Modal({ isOpen, onClose }) {
    if (!isOpen) {
        return null;
      }
  return (
    <div className="fixed w-50 inset-0 flex items-center justify-center ">
    <div className="modal-overlay"></div>

    <div className="modal-container bg-white w:96 p-4 rounded shadow-lg">
      <button
        onClick={onClose}
        className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-900"
      >
        Close
      </button>

      <Form />
    </div>
  </div>
  );
}

export default Modal;
