import React from "react";

const Input = ({ className, ...props }) => (
  <input className={`border rounded px-3 py-2 ${className}`} {...props} />
);

export default Input;
