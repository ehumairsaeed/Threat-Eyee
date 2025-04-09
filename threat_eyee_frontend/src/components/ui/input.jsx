// src/components/ui/input.jsx
import React from 'react';

export const Input = (props) => {
  return (
    <input
      {...props}
      className="bg-black text-white border border-green-500 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
    />
  );
};
