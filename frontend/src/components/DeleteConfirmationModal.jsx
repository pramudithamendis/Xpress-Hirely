import React from "react";

const DeleteConfirmationModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full">
        <div className="px-6 py-4">
          <p className="text-lg font-semibold mb-4">Are you sure you want to delete this record?</p>
          <div className="flex justify-end">
            <button
              onClick={onDelete}
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded mr-2"
            >
              Yes
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-3 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
