const Select = ({ label, options, handleChange, value, name }) => {
  return (
    <div>
      <label>{label}</label>
      <select value={value} onChange={handleChange} name={name}>
        <option value="" hidden>
          Choose...
        </option>
        {options.map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
