import React from "react";

export const Card = ({ children, className }) => (
  <div className={`border shadow-md p-4 rounded-lg ${className}`}>{children}</div>
);

export const CardContent = ({ children, className }) => (
  <div className={`p-2 ${className}`}>{children}</div>
);
