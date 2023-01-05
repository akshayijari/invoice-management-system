import * as React from "react";

const Dropdown = ({ label, value, options, onChange }) => {
  return (
    <>
      <label className="text-sm">
        {label}
        <select
          value={value}
          onChange={onChange}
          className="py-2 px-4 mb-6 bg-gray-100 w-full"
        >
          {options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>
    </>
  );
};
export default Dropdown;
