// src/components/ui/button.jsx
import React from 'react';

export const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`bg-green-600 text-white py-2 px-4 rounded-xl hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-700 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
