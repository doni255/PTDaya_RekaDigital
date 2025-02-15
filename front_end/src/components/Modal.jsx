import React, { useEffect, useState } from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  const [showModal, setShowModal] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true); // Mount the modal
      setTimeout(() => setAnimate(true), 10); // Start animation after mounting
    } else {
      setAnimate(false); // Start fade-out animation
      setTimeout(() => setShowModal(false), 300); // Remove modal after animation completes
    }
  }, [isOpen]);

  if (!showModal) return null; // Prevent rendering when fully closed

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center bg-black/50 z-50 transition-opacity duration-300 ${
        animate ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`border border-teal-500 shadow-lg bg-white w-11/12 md:max-w-md mx-auto rounded-lg overflow-hidden transform transition-transform duration-300 ${
          animate ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4">{children}</div>

        {/* <div className="flex justify-end p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-black rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button className="px-4 py-2 ml-3 bg-teal-500 text-white rounded-lg hover:bg-teal-400">
            Confirm
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Modal;
