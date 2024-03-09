const NotificationPanel = ({
  messages,
  onClose,
  onClearAll,
  onRemoveMessage,
}) => {
  const handleRemoveMessage = (index) => {
    onRemoveMessage(index);
  };

  const handleClearAll = () => {
    onClearAll();
  };
  console.log(messages);
  return (
    <div className="absolute top-14 right-0 bg-white border-2 border-gray-300 max-h-[500px] overflow-y-auto w-60 shadow-lg z-10 transition-opacity duration-5000 opacity-100">
      <div className="flex justify-between items-center mb-2 p-2">
        <h3 className="text-lg font-semibold">Notifications</h3>
        <button onClick={onClose} className="hover:text-red-700">
          Close
        </button>
      </div>
      {messages && messages.length > 0 && (
        <ul>
          {messages.map((message, index) => (
            <li
              key={index}
              className="hover:bg-slate-300 p-2 cursor-pointer"
              onClick={() => handleRemoveMessage(message.id)}
            >
              {message?.message}
            </li>
          ))}
        </ul>
      )}
      {messages && messages.length > 0 ? (
        <button
          className="text-blue-500 hover:text-blue-700 hover:bg-slate-300   p-2 w-full text-center"
          onClick={handleClearAll}
        >
          Clear All
        </button>
      ) : (
        <div className="text-hoverGray p-2 font-bold">
          No unread Notifications! <span className="text-red-600 h-8">☹</span>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
