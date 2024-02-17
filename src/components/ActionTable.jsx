function parseDateTime(timestamp) {
  // Convert the timestamp to a Date object
  const dateObj = new Date(timestamp);

  // Extract the date components
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(dateObj.getDate()).padStart(2, "0");

  // Format the date as YYYY-MM-DD
  const date = `${year}-${month}-${day}`;

  // Extract the time components
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const seconds = String(dateObj.getSeconds()).padStart(2, "0");

  // Format the time as HH:MM:SS
  const time = `${hours}:${minutes}:${seconds}`;

  return { date, time };
}
const ActionHistory = ({ actionData, bol_history_logs }) => {
  console.log(bol_history_logs?.time);
  const { date, time } = parseDateTime(bol_history_logs[0]?.time);
  return (
    <>
      <div className="relative bg-borderGrey h-full border-2 border-gray overflow-y-auto rounded-md ">
        {bol_history_logs !== undefined && bol_history_logs.length > 0 ? (
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
        ) : (
          <div className="text-hoverGray text-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            No history till now
          </div>
        )}
      </div>
    </>
  );
};

export default ActionHistory;
