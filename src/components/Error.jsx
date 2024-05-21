const Error = ({ retry, message }) => {
  return (
    <div className="error">
      <p> Sorry, an error occurred while accessing the data.</p>
      <p className="text">{message}</p>

      <button onClick={retry} className="btn">
        {" "}
        Try Again
      </button>
    </div>
  );
};

export default Error;
