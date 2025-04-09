// src/components/ui/scrollArea.jsx
import React from 'react';

export const ScrollArea = ({ children, className }) => {
  return (
    <div className={`overflow-y-auto ${className}`}>
      {children}
    </div>
  );
};
