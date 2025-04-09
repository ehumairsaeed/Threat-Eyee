// src/components/ui/card.jsx

import React from 'react';

export function Card({ children }) {
  return (
    <div className="bg-black border border-zinc-700 rounded-lg">{children}</div>
  );
}

export function CardContent({ children }) {
  return (
    <div className="p-4 text-white">
      {children}
    </div>
  );
}
