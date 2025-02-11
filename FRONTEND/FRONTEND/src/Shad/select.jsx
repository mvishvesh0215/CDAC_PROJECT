import React from "react";

export const Select = ({ children, className, ...props }) => (
  <select className={`border rounded px-3 py-2 ${className}`} {...props}>
    {children}
  </select>
);

export const SelectTrigger = ({ className, ...props }) => (
  <button className={`border px-4 py-2 rounded ${className}`} {...props} />
);

export const SelectContent = ({ children, className }) => (
  <div className={`border rounded shadow-md p-2 ${className}`}>{children}</div>
);

export const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);

export const SelectValue = ({ value }) => <span>{value}</span>;
