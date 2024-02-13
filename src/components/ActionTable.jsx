const ActionHistory = ({ actionData }) => {
  return (
    <div className="bg-borderGrey h-full border-2 border-gray overflow-y-auto rounded-md">
      <table className="w-full">
        <thead className="bg-white text-black sticky top-0">
          <tr className="text-center">
            <th>Date</th>
            <th>Time</th>
            <th>Agent</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {actionData.map((rowData, index) => (
            <tr
              key={index}
              className="text-center text-white hover:bg-textgray"
            >
              <td>{rowData.date}</td>
              <td>{rowData.time}</td>
              <td>{rowData.agent}</td>
              <td>{rowData.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActionHistory;
