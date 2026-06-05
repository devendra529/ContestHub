const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full">
        <button
          onClick={onClose}
          className="float-right text-gray-500"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;