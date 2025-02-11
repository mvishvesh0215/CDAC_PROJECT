import React from "react";

export const Table = ({ children, className }) => (
  <table className={`w-full border-collapse border ${className}`}>{children}</table>
);

export const TableBody = ({ children }) => <tbody>{children}</tbody>;

export const TableCell = ({ children }) => <td className="border p-2">{children}</td>;

export const TableHead = ({ children }) => <th className="border p-2">{children}</th>;

export const TableHeader = ({ children }) => <thead>{children}</thead>;

export const TableRow = ({ children }) => <tr>{children}</tr>;
