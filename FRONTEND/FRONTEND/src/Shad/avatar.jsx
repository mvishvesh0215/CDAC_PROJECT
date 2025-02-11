import React from "react";

export const Avatar = ({ className, children }) => (
  <div className={`rounded-full overflow-hidden w-12 h-12 ${className}`}>{children}</div>
);

export const AvatarImage = ({ src, alt }) => (
  <img src={src} alt={alt || "Avatar"} className="w-full h-full object-cover" />
);

export const AvatarFallback = ({ children }) => (
  <div className="w-full h-full flex items-center justify-center bg-gray-300 text-white">
    {children}
  </div>
);
